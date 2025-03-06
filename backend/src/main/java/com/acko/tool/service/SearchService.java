package com.acko.tool.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.acko.tool.entity.search.SearchFilterAggregatedOption;
import com.acko.tool.entity.search.SearchParam;
import com.acko.tool.entity.search.SearchParamField;
import com.acko.tool.entity.search.TaskSearch;
import com.acko.tool.entity.search.TaskSearchFilter;
import com.acko.tool.entity.search.TaskSearchableField;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.acko.tool.exception.ResourceNotFoundException;
import com.acko.tool.repository.SearchParamRepository;
import com.acko.tool.utils.ReflectionUtil;
import com.acko.tool.utils.SearchUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.BooleanUtils;
import org.elasticsearch.action.search.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Log4j2
public class SearchService {
    private final ElasticsearchClient elasticSearchClient;
    private final SearchParamRepository searchParamRepository;
    private final SearchUtils searchUtils;
    private final ReflectionUtil reflectionUtil;

    public SearchParam getParamsForEntity(String entity) {
        SearchParam searchParam = searchParamRepository.findSearchParamByEntity(entity, true);
        if(Objects.isNull(searchParam)) {
            throw new ResourceNotFoundException("No search param found for given entity");
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

        List<TaskSearchFilter> searchFilters = searchRequestInput.getFilters();
        if(Objects.isNull(searchFilters) || searchFilters.isEmpty()) {
            response.setFilters(getDefaultFiltersForEntity( searchParams));
        } else {
            response.setFilters(searchFilters);
        }

        List<Query> mustQueries = searchUtils.getQueryForSearchableFields(response.getSearchableFields(), searchParams);

        List<Query> shouldQueries = searchUtils.getQueryForFilterableFields(response.getFilters(), searchParams);

        List<Query> universalQueries = searchUtils.getQueryForGlobalSearch(response.getSearchStr(), searchParams);

//        SortBuilder<?> sortBuilder = getSortBuilder(Objects.requireNonNull(selectedSort));

        Map<String, Aggregation> aggregationBuilders = searchUtils.getAggregationsForFilters(searchParams);

        List<Query> finalMustQueries = new ArrayList<>();
        if(!mustQueries.isEmpty()) {
            Query boolQuery = Query.of(q -> q.bool(b -> b.must(mustQueries)));
            finalMustQueries.add(boolQuery);
        }

        if(!shouldQueries.isEmpty()) {
            Query boolQuery = Query.of(q -> q.bool(b -> b.should(shouldQueries)));
            finalMustQueries.add(boolQuery);
        }

        if(!universalQueries.isEmpty()) {
            Query boolQuery = Query.of(q -> q.bool(b -> b.should(universalQueries)));
            finalMustQueries.add(boolQuery);
        }

        Query finalQuery = Query.of(q -> q.bool(b -> b.must(finalMustQueries)));

        SearchResponse<Map> elasticResponse = elasticSearchClient.search(s -> s
                .index("tasks")
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

    private List<TaskSearchFilter> getDefaultFiltersForEntity( SearchParam searchParams) {
        List<SearchParamField> searchParamsFields = searchParams.getParams().stream().filter(
            SearchParamField::getIsFilterable).toList();

        if(searchParamsFields.isEmpty()) return new ArrayList<>();

        return searchParamsFields.stream().map(searchParamField -> {
            TaskSearchFilter filter = new TaskSearchFilter();
            filter.setFieldType(searchParamField.getFieldType());
            filter.setFieldName(searchParamField.getFieldName());
            filter.setFieldDisplayName(searchParamField.getFieldDisplayName());
            filter.setOptions(new ArrayList<>());
            return filter;
        }).collect(Collectors.toList());
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
        List<TaskSearchFilter> allFilters = getDefaultFiltersForEntity( searchParams);
        List<TaskSearchFilter> inputFilters = response.getFilters();

        HashMap<String, List<String>> selectedFilters = new HashMap<>();
        for(TaskSearchFilter filter: inputFilters) {
            if(filter.getOptions() != null) {
                List<String> selectedOptions = filter.getOptions().stream()
                    .filter(SearchFilterAggregatedOption::getIsSelected)
                    .map(SearchFilterAggregatedOption::getValue)
                    .collect(Collectors.toList());
                selectedFilters.put(filter.getFieldName(), selectedOptions);
            }
        }

        Map<String, List<SearchFilterAggregatedOption>> aggregationResponse = new HashMap<>();
        aggregationBuilders.keySet().forEach(aggName -> {
            if(elasticResponse.aggregations() != null && elasticResponse.aggregations().get(aggName) != null) {
                elasticResponse.aggregations().get(aggName).sterms().buckets().array().forEach(bucket -> {
                    SearchFilterAggregatedOption aggNumber = new SearchFilterAggregatedOption();
                    aggNumber.setValue(bucket.key().stringValue());
                    aggNumber.setCount(bucket.docCount());
                    aggNumber.setIsSelected(false);
                    if(Objects.isNull(aggregationResponse.get(aggName.split("_agg")[0]))) {
                        aggregationResponse.put(aggName.split("_agg")[0], new ArrayList<>());
                    }
                    aggregationResponse.get(aggName.split("_agg")[0]).add(aggNumber);
                });
            }
        });
        for(TaskSearchFilter filter: allFilters) {
            if(aggregationResponse.containsKey(filter.getFieldName())) {
                filter.setOptions(aggregationResponse.get(filter.getFieldName()));
                if(selectedFilters.containsKey(filter.getFieldName())) {
                    filter.getOptions().forEach(option -> {
                        option.setIsSelected(BooleanUtils.toBoolean(selectedFilters.get(filter.getFieldName()).contains(option.getValue())));
                    });
                }
            }
        }
        response.setFilters(allFilters);
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
