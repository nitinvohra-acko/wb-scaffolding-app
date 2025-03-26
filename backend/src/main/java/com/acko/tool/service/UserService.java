package com.acko.tool.service;

import static com.acko.tool.constants.Constants.MAX_AGGREGATION_BUCKET_SIZE;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import com.acko.tool.config.properties.ElasticSearchConfigProperties;
import com.acko.tool.dto.UserDTO;
import com.acko.tool.entity.User;
import com.acko.tool.entity.search.SearchType;
import com.acko.tool.entity.search.filter.Filter;
import com.acko.tool.entity.search.filter.FilterAttributesRange;
import com.acko.tool.entity.search.filter.FilterAttributesTerm;
import com.acko.tool.entity.search.filter.FilterOptions;
import com.acko.tool.entity.search.filter.FilterRange;
import com.acko.tool.entity.search.filter.FilterTerm;
import com.acko.tool.entity.search.filter.RangeValue;
import com.acko.tool.entity.search.sort.Sort;
import com.acko.tool.entity.search.user.ESUser;
import com.acko.tool.entity.search.user.UserFilter;
import com.acko.tool.entity.search.user.UserSearch;
import com.acko.tool.entity.search.user.UserSearchFields;
import com.acko.tool.entity.search.user.UserSort;
import com.acko.tool.repository.mongo.UserRepository;
import com.acko.tool.utils.ESUtils;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

	private static final Integer DEFAULT_PAGE_NO = 1;
	private static final Integer DEFAULT_PAGE_SIZE = 10;
	
	private final KeycloakService keycloakService;
	private final UserRepository userRepository;
	private final ESUtils esUtils;
	private final ElasticSearchConfigProperties elasticSearchConfigProperties;
	private final ElasticsearchClient elasticsearchClient;
	
	public User createOrUpdateUser(UserDTO userRequest) {
		User dbUser = userRepository.findByUsername(userRequest.getUsername()).orElse(null);
		if (dbUser == null) {
			// CREATE case
			UserRepresentation keycloakUser = keycloakService.createUser(userRequest);
			dbUser = createUserEntity(keycloakUser.getId(), userRequest);
		} else {
			// UPDATE case
			keycloakService.updateUser(dbUser.getId(), userRequest);
			updateUserEntity(userRequest, dbUser);
		}
		dbUser = userRepository.save(dbUser);
		
		// update in ES
		esUtils.putUserInES(dbUser, null);
		return dbUser;
	}

    private User createUserEntity(String userId, UserDTO userRequest) {
		return User.builder()
				.id(userId)
				.username(userRequest.getUsername())
				.email(userRequest.getEmail())
				.firstName(userRequest.getFirstName())
				.lastName(userRequest.getLastName())
				.group(userRequest.getGroup())
				.active(userRequest.isActive())
				.customAttributes(userRequest.getCustomAttributes())
				.createdDate(new Date())
				.build();
	}

	private void updateUserEntity(UserDTO userRequest, User dbUser) {
		dbUser.setUsername(userRequest.getUsername());
		dbUser.setEmail(userRequest.getEmail());
		dbUser.setFirstName(userRequest.getFirstName());
		dbUser.setLastName(userRequest.getLastName());
		dbUser.setLastName(userRequest.getLastName());
		dbUser.setGroup(userRequest.getGroup());
		dbUser.setActive(userRequest.isActive());
		dbUser.setCustomAttributes(userRequest.getCustomAttributes());
	}

	public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

	public UserSearch searchUsers(UserSearch request) throws Exception {
		UserSearch response = new UserSearch();
		response.setPageNo(request.getPageNo() != null ? request.getPageNo() : DEFAULT_PAGE_NO);
		response.setPageSize(request.getPageSize() != null ? request.getPageSize():DEFAULT_PAGE_SIZE);
        response.setSearchStr(request.getSearchStr());
        try {
            response.setSort(CollectionUtils.isEmpty(request.getSort()) ? getAllSortInfo() : request.getSort());
            response.setFilters(CollectionUtils.isEmpty(request.getFilters()) ? getAllFilterInfo() : request.getFilters());

            Sort selectedSort = response.getSort()
                    .stream()
                    .filter(sort -> BooleanUtils.isTrue(sort.getIsSelected()))
                    .findFirst()
                    .map(Function.identity())
                    .orElse(null);

            List<FilterTerm> selectedTermFilters = Optional.ofNullable(request.getFilters()).orElse(Collections.emptyList())
                    .stream()
                    .filter(filter -> filter.getAttributes() != null)
                    .filter(filter -> filter instanceof FilterTerm)
                    .map(FilterTerm.class::cast)
                    .filter(termFilter -> CollectionUtils.isNotEmpty(termFilter.getAttributes().getValue()))
                    .collect(Collectors.toList());

            List<FilterRange> selectedRangeFilters = Optional.ofNullable(request.getFilters()).orElse(Collections.emptyList())
                    .stream()
                    .filter(filter -> filter.getAttributes() != null)
                    .filter(filter -> filter instanceof FilterRange)
                    .map(FilterRange.class::cast)
                    .filter(rangeFilter -> checkIfRangeFilterSelected(rangeFilter.getAttributes().getValue()))
                    .collect(Collectors.toList());


            List<Query> allQueryBuilders = getAllQueryBuilders(selectedTermFilters, selectedRangeFilters, response.getSearchStr());
            List<Aggregation> allAggregationBuilders = getAllAggregationBuilders();
            SortOptions sortBuilder = getSortBuilder(Objects.requireNonNull(selectedSort));

            // all queries
			BoolQuery boolQuery = BoolQuery.of(b -> b.must(allQueryBuilders));
            
			int pageNo = request.getPageNo() != null ? request.getPageNo() : DEFAULT_PAGE_NO;
			int pageSize = request.getPageSize() != null ? request.getPageSize() : DEFAULT_PAGE_SIZE;

			SearchRequest searchRequest = new SearchRequest.Builder()
					.index(elasticSearchConfigProperties.getUserIndex())  // Specify the index
					.query(Query.of(q -> q.bool(boolQuery)))  // Use the bool query here
					.aggregations(allAggregationBuilders.stream()
							.collect(Collectors.toMap(
									aggregation -> aggregation.terms().name(),  // Using the class name as aggregation name (you can customize this)
									aggregation -> Aggregation.of(a -> a.terms(t -> t.field(aggregation.terms().field()).size(MAX_AGGREGATION_BUCKET_SIZE)))
									)))
					.sort(sortBuilder)
					.from((pageNo - 1) * pageSize)
					.size(pageSize)
					.build();

            log.info("Search request formed for searching - {}", searchRequest.toString());

            SearchResponse<ESUser> searchResponse = elasticsearchClient.search(searchRequest, ESUser.class);

            if (searchResponse != null && searchResponse.hits() != null && CollectionUtils.isNotEmpty(searchResponse.hits().hits())) {
                List<ESUser> result = new ArrayList<>();

				for (Hit<ESUser> searchHit : searchResponse.hits().hits()) {
					if (searchHit.source() != null) {
						result.add(searchHit.source());
					}
				}
                response.setResult(result);
                response.setTotalCount(searchResponse.hits().total().value());
                populateFiltersOptions(response.getFilters(), searchResponse.aggregations());
            } else {
                response.setResult(new ArrayList<>());
            }

        } catch (Exception e) {
            log.error("Exception occurred while searching proposals", e);
            throw e;
        }
        return response;
	}
	
	
	private void populateFiltersOptions(List<Filter<?>> filters, Map<String, Aggregate> aggregations) {

        // we need to populate 'options' for term filters only
        List<FilterTerm> termFilters = filters.stream().filter(f -> f instanceof FilterTerm)
                .map(FilterTerm.class::cast)
                .collect(Collectors.toList());
//        ((TermsAggregateBase<?>)aggregations.get("GROUP")._get()).buckets().array();

        for (FilterTerm termFilter : termFilters) {
            Aggregate aggregate =  aggregations.get(termFilter.getFieldId());
            List<FilterOptions> filterOptions = new ArrayList<>();
			if (aggregate != null) {
				if(aggregate.isSterms()) {
					aggregate.sterms().buckets().array().forEach(bucket -> {
	                    filterOptions.add(FilterOptions.builder()
	                            .name(bucket.key().stringValue())
	                            .count(bucket.docCount())
	                            .build());
	                });
				} else if (aggregate.isLterms()) {
					aggregate.lterms().buckets().array().forEach(bucket -> {
	                    filterOptions.add(FilterOptions.builder()
	                            .name(bucket.keyAsString())
	                            .count(bucket.docCount())
	                            .build());
					 });
				}
				
            }
            termFilter.getAttributes().setOptions(filterOptions);
        }

    
		
	}

	private List<Sort> getAllSortInfo() {
		List<Sort> allSort = new ArrayList<>();
		for (UserSort userSort : UserSort.values()) {
			allSort.add(Sort.builder()
					.fieldId(userSort.name())
					.fieldName(userSort.getDisplayName())
					.order(SortOrder.Desc.toString())
					.isSelected(userSort.isDefaultSelected())
					.build());
		}
		return allSort;
	}
	
	private List<Filter<?>> getAllFilterInfo() {
        List<Filter<?>> allFilters = new ArrayList<>();
        for (UserFilter searchFilter : UserFilter.values()) {
            if (SearchType.term.equals(searchFilter.getSearchType())) {
                FilterTerm termFilter = new FilterTerm();
                termFilter.setType(SearchType.term);
                termFilter.setFieldId(searchFilter.name());
                termFilter.setFieldName(searchFilter.getDisplayName());

                FilterAttributesTerm filterAttributesTerm = new FilterAttributesTerm();
                filterAttributesTerm.setOptions(new ArrayList<>());
                filterAttributesTerm.setValue(new ArrayList<>());
                termFilter.setAttributes(filterAttributesTerm);

                allFilters.add(termFilter);
            } else if (SearchType.range.equals(searchFilter.getSearchType())) {
                FilterRange rangeFilter = new FilterRange();
                rangeFilter.setType(SearchType.range);
                rangeFilter.setFieldId(searchFilter.name());
                rangeFilter.setFieldName(searchFilter.getDisplayName());

                FilterAttributesRange filterAttributesRange = new FilterAttributesRange();
                filterAttributesRange.setOptions(new ArrayList<>());
                filterAttributesRange.setValue(RangeValue.builder().from("").to("").build());
                rangeFilter.setAttributes(filterAttributesRange);

                allFilters.add(rangeFilter);
            }
        }
        return allFilters;
    }
	
	private boolean checkIfRangeFilterSelected(RangeValue rangeValue) {
		return rangeValue != null 
				&& (rangeValue.getFrom() != null || rangeValue.getTo() != null);
	}
	
	private List<Query> getAllQueryBuilders(List<FilterTerm> selectedTermFilters, List<FilterRange> selectedRangeFilters, String searchStr) {
        List<Query> allQueryBuilders = new ArrayList<>();

        if (StringUtils.isNotBlank(searchStr)) {
        	allQueryBuilders.add(Query.of(q -> q
                    .multiMatch(mm -> mm
                            .query(searchStr)
                            .fields(Arrays.asList(UserSearchFields.getAllSearchStringFields())) // Replace with actual fields
                    ))
            );
//        	allQueryBuilders.add(QueryBuilders.multiMatchQuery(searchStr, UserSearchFields.getAllSearchStringFields()));
        }

        if (CollectionUtils.isNotEmpty(selectedTermFilters)) {
            selectedTermFilters.forEach(stf -> {
                UserFilter selectedTermFilterEnum = UserFilter.fromString(stf.getFieldId());
                if (selectedTermFilterEnum != null) {
                    allQueryBuilders.add(selectedTermFilterEnum.getQuery().apply(stf.getAttributes()));
                }
            });
        }

        if (CollectionUtils.isNotEmpty(selectedRangeFilters)) {
            selectedRangeFilters.forEach(srf -> {
            	UserFilter selectedRangeFilterEnum = UserFilter.fromString(srf.getFieldId());
                if (selectedRangeFilterEnum != null) {
                    Query queryBuilder = selectedRangeFilterEnum.getQuery().apply(srf.getAttributes());
                    if (queryBuilder != null) {
                        allQueryBuilders.add(selectedRangeFilterEnum.getQuery().apply(srf.getAttributes()));
                    }
                }
            });
        }
        return allQueryBuilders;
    }
	
	private List<Aggregation> getAllAggregationBuilders() {
        return Arrays.stream(UserFilter.values())
                .map(UserFilter::getAggregation)
                .filter(Objects::nonNull)
                .map(Supplier::get)
                .collect(Collectors.toList());
    }
	
	public SortOptions getSortBuilder(Sort selectedSort) {
		UserSort selectedRapSearchSort = UserSort.fromString(selectedSort.getFieldId());
        return Objects.requireNonNull(selectedRapSearchSort)
                .getSortBuilder()
                .apply("asc".equalsIgnoreCase(selectedSort.getOrder()) ? SortOrder.Asc : SortOrder.Desc);
    }

}
