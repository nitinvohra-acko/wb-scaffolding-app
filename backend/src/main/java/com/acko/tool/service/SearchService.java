package com.acko.tool.service;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import com.acko.tool.entity.search.SearchType;
import com.acko.tool.entity.search.filter.Filter;
import com.acko.tool.entity.search.filter.FilterAttributesRange;
import com.acko.tool.entity.search.filter.FilterAttributesTerm;
import com.acko.tool.entity.search.filter.FilterOptions;
import com.acko.tool.entity.search.filter.FilterRange;
import com.acko.tool.entity.search.filter.FilterTerm;
import com.acko.tool.entity.search.filter.RangeValue;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.lang3.BooleanUtils;
import org.springframework.stereotype.Service;

import com.acko.tool.config.properties.ElasticSearchConfigProperties;
import com.acko.tool.entity.search.SearchFilterAggregatedOption;
import com.acko.tool.entity.search.SearchParam;
import com.acko.tool.entity.search.SearchParamField;
import com.acko.tool.entity.search.TaskSearch;
import com.acko.tool.entity.search.TaskSearchFilter;
import com.acko.tool.entity.search.TaskSearchableField;
import com.acko.tool.exception.ResourceNotFoundException;
import com.acko.tool.repository.mongo.SearchParamRepository;
import com.acko.tool.utils.ReflectionUtil;
import com.acko.tool.utils.SearchUtils;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@AllArgsConstructor
@Log4j2
public class SearchService {
	private final ElasticSearchConfigProperties elasticSearchConfigProperties; 
	private final ElasticsearchClient elasticSearchClient;
    private final SearchParamRepository searchParamRepository;
    private final SearchUtils searchUtils;
    private final ReflectionUtil reflectionUtil;

    public SearchParam getParamsForEntity(String entity) {
        SearchParam searchParam = searchParamRepository.findSearchParamByEntity(entity, true);
        if(Objects.isNull(searchParam)) {
            log.error("No search param found for given entity");
            return SearchParam.builder().entity(entity).params(new ArrayList<>()).build();
        }
        return searchParam;
    }

    public SearchParam createOrUpdateSearchParam(SearchParam searchParamRequest) {
        SearchParam searchParam = searchParamRepository.findSearchParamByEntity(searchParamRequest.getEntity(), true);
        if(Objects.nonNull(searchParam)) {
            searchParamRequest.setId(searchParam.getId());
        }
        return searchParamRepository.save(searchParamRequest);
    }

    public TaskSearch searchTasks(TaskSearch searchRequestInput, String entity) throws IOException {
        SearchParam searchParams = getParamsForEntity(entity);
        TaskSearch response = new TaskSearch();

        response.setPageNo(Objects.nonNull(searchRequestInput.getPageNo())? searchRequestInput.getPageNo(): 1);
        response.setPageSize(Objects.nonNull(searchRequestInput.getPageSize())? searchRequestInput.getPageSize(): 50);
        response.setSearchStr(searchRequestInput.getSearchStr());

        List<TaskSearchableField> searchableFields = searchRequestInput.getSearchableFields();
        if(Objects.isNull(searchableFields) || searchableFields.isEmpty()) {
            response.setSearchableFields(getDefaultSearchableFieldsForEntity( searchParams));
        } else {
            response.setSearchableFields(searchableFields);
        }

        List<Filter<?>> searchFilters = searchRequestInput.getFilters();
        if(Objects.isNull(searchFilters) || searchFilters.isEmpty()) {
            response.setFilters(getDefaultFiltersForEntity( searchParams));
        } else {
            response.setFilters(searchFilters);
        }

        List<Query> searchableFieldsQueries = searchUtils.getQueryForSearchableFields(response.getSearchableFields(), searchParams);

        List<Query> filterTermQueries = searchUtils.getQueryForFilterTermFields(response.getFilters(), searchParams);
        List<Query> filterRangeQueries = searchUtils.getQueryForFilterRangeFields(response.getFilters(), searchParams);

        List<Query> universalQueries = searchUtils.getQueryForGlobalSearch(response.getSearchStr(), searchParams);

//        SortBuilder<?> sortBuilder = getSortBuilder(Objects.requireNonNull(selectedSort));

        Map<String, Aggregation> aggregationBuilders = searchUtils.getAggregationsForFilters(searchParams);

        List<Query> finalMustQueries = new ArrayList<>();
        if(!searchableFieldsQueries.isEmpty()) {
            Query boolQuery = Query.of(q -> q.bool(b -> b.must(searchableFieldsQueries)));
            finalMustQueries.add(boolQuery);
        }

        if(!filterTermQueries.isEmpty()) {
            Query boolQuery = Query.of(q -> q.bool(b -> b.should(filterTermQueries)));
            finalMustQueries.add(boolQuery);
        }

        if(!filterRangeQueries.isEmpty()) {
            Query boolQuery = Query.of(q -> q.bool(b -> b.must(filterRangeQueries)));
            finalMustQueries.add(boolQuery);
        }

        if(!universalQueries.isEmpty()) {
            Query boolQuery = Query.of(q -> q.bool(b -> b.should(universalQueries)));
            finalMustQueries.add(boolQuery);
        }

        Query finalQuery = Query.of(q -> q.bool(b -> b.must(finalMustQueries)));

        SearchResponse<Map> elasticResponse = elasticSearchClient.search(s -> s
                .index(elasticSearchConfigProperties.getTaskIndex())
                .query(finalQuery)
                .aggregations(aggregationBuilders)
                .from((response.getPageNo() - 1) * response.getPageSize())
                .size(response.getPageSize()),
            Map.class
        );

        ArrayList<Object> resultArray = new ArrayList<>();
        for (Hit<Map> hit : elasticResponse.hits().hits()) {
            resultArray.add(hit.source());
        }
        response.setResult(resultArray);
        response.setTotalCount(elasticResponse.hits().total().value());

        transformSearchResponse(response, elasticResponse, aggregationBuilders, searchParams);

        return response;
    }

    private List<Filter<?>> getDefaultFiltersForEntity( SearchParam searchParams) {
        List<SearchParamField> searchParamsFields = searchParams.getParams().stream().filter(
            SearchParamField::getIsFilterable).toList();

        if(searchParamsFields.isEmpty()) return new ArrayList<>();

        List<Filter<?>> response = new ArrayList<>();
        for(SearchParamField searchParamField: searchParamsFields) {
            if(SearchType.valueOf(searchParamField.getFieldType()).equals(SearchType.term)) {
                FilterTerm filter = new FilterTerm();
                filter.setFieldId(searchParamField.getFieldName());
                filter.setFieldName(searchParamField.getFieldDisplayName());
                filter.setType(SearchType.valueOf(searchParamField.getFieldType()));
                filter.setAttributes(null);
                response.add(filter);
            } else {
                FilterRange filter = new FilterRange();
                filter.setFieldId(searchParamField.getFieldName());
                filter.setFieldName(searchParamField.getFieldDisplayName());
                filter.setType(SearchType.valueOf(searchParamField.getFieldType()));
                filter.setAttributes(null);
                response.add(filter);
            }

        }
        return response;
    }

    private List<TaskSearchableField> getDefaultSearchableFieldsForEntity( SearchParam searchParams) {
        List<SearchParamField> searchParamsFields = searchParams.getParams().stream().filter(
            SearchParamField::getIsSearchable).toList();

        if(searchParamsFields.isEmpty()) return new ArrayList<>();

        return searchParamsFields.stream().map(searchParamField -> {
            TaskSearchableField field = new TaskSearchableField();
            field.setFieldType(searchParamField.getFieldType());
            field.setFieldName(searchParamField.getFieldName());
            field.setFieldDisplayName(searchParamField.getFieldDisplayName());
            field.setValue(null);
            return field;
        }).collect(Collectors.toList());
    }

    private void transformSearchResponse(TaskSearch response, SearchResponse<Map> elasticResponse, Map<String, Aggregation> aggregationBuilders, SearchParam searchParams) {
        List<Filter<?>> allFilters = getDefaultFiltersForEntity( searchParams);
        if(allFilters.isEmpty()) return;


        List<Filter<?>> filters = !response.getFilters().isEmpty()? response.getFilters() :  allFilters;
        List<FilterTerm> termFilters = filters.stream().filter(f -> f instanceof FilterTerm)
            .map(FilterTerm.class::cast)
            .collect(Collectors.toList());
        List<FilterRange> rangeFilters = filters.stream().filter(f -> f instanceof FilterRange)
            .map(FilterRange.class::cast)
            .collect(Collectors.toList());

        for (FilterTerm termFilter : termFilters) {
            Aggregate aggregate =  elasticResponse.aggregations().get(termFilter.getFieldId()+"_agg");
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
            if(Objects.isNull(termFilter.getAttributes())) {
                termFilter.setAttributes(new FilterAttributesTerm());
            }
            termFilter.getAttributes().setOptions(filterOptions);
            if(Objects.isNull(termFilter.getAttributes().getValue())) {
                termFilter.getAttributes().setValue(new ArrayList<>());
            }

        }

//        for (FilterRange rangeFilter : rangeFilters) {
//            if(Objects.isNull(rangeFilter.getAttributes())) {
//                rangeFilter.setAttributes(new FilterAttributesRange());
//            }
//            rangeFilter.getAttributes().setOptions(new ArrayList<>());
//            if(Objects.isNull(rangeFilter.getAttributes().getValue())) {
//                rangeFilter.getAttributes().setValue(new RangeValue());
//            }
//        }
//        response.setFilters(allFilters);
    }
//    private SortBuilder<?> getSortBuilder(TaskSort selectedSort, SearchParam searchParams) {
//        RAPSearchSort selectedRapSearchSort = RAPSearchSort.fromString(selectedSort.getFieldId());
//        return Objects.requireNonNull(selectedRapSearchSort)
//            .getSortBuilder()
//            .apply(SortOrder.fromString(selectedSort.getOrder()));
//    }

    public List<SearchParamField> getCombinedSearchFields(String entity)
        throws NoSuchFieldException {
        List<HashMap<String, String>> list = reflectionUtil.extractLeafNodes(searchUtils.isEntityValid(entity), "");
        SearchParam savedParams = getParamsForEntity(entity);
        List<SearchParamField> searchParamFields = savedParams.getParams();
        List<SearchParamField> combinedFields = new ArrayList<>();
        for (HashMap<String, String> map : list) {
            SearchParamField searchParamField = new SearchParamField();
            searchParamField.setVariableName(map.get("variable"));
            searchParamField.setFieldName(null);
            searchParamField.setFieldDisplayName(null);
            searchParamField.setFieldType(map.get("type"));
            searchParamField.setIsFilterable(false);
            searchParamField.setIsSearchable(false);
            combinedFields.add(searchParamField);
        }
        for (SearchParamField searchParamField : searchParamFields) {
            if (combinedFields.stream().noneMatch(field -> field.getVariableName().equals(searchParamField.getVariableName()))) {
                combinedFields.add(searchParamField);
            } else {
                combinedFields.stream().filter(field -> field.getVariableName().equals(searchParamField.getVariableName())).findFirst().ifPresent(field -> {
                    field.setIsFilterable(searchParamField.getIsFilterable());
                    field.setIsSearchable(searchParamField.getIsSearchable());
                    field.setFieldName(searchParamField.getFieldName());
                    field.setFieldDisplayName(searchParamField.getFieldDisplayName());
                });
            }
        }

        for(SearchParamField searchParamField: combinedFields) {
            if(searchParamField.getFieldDisplayName() == null) {
                searchParamField.setFieldDisplayName(replaceDotWithArrow(searchParamField.getVariableName()));
            }
        }
        return combinedFields;
    }

    public static String replaceDotWithArrow(String input) {
        if (input == null) {
            return null;
        }
        return input.replace(".", " -> ");
    }
}
