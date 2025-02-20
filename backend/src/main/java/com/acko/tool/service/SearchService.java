package com.acko.tool.service;

import com.acko.tool.entity.Search.SearchParam;
import com.acko.tool.entity.Search.SearchParamField;
import com.acko.tool.entity.Search.TaskSearch;
import com.acko.tool.entity.Search.TaskSearchFilter;
import com.acko.tool.entity.Search.TaskSearchableField;
import com.acko.tool.entity.Search.TaskSort;
import com.acko.tool.exception.ResourceNotFoundException;
import com.acko.tool.repository.SearchParamRepository;
import com.acko.tool.utils.SearchUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.BooleanUtils;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
@Log4j2
public class SearchService {
    RestHighLevelClient elasticSearchClient;
    SearchParamRepository searchParamRepository;
    SearchUtils searchUtils;

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

        List<TaskSearchableField> searchableFields = searchRequestInput.getSearchableFields();
        if(Objects.isNull(searchableFields) || searchableFields.isEmpty()) {
            response.setSearchableFields(setDefaultSearchableFieldsForEntity(entity, searchParams));
        }

        List<TaskSearchFilter> searchFilters = searchRequestInput.getFilters();
        if(Objects.isNull(searchFilters) || searchFilters.isEmpty()) {
            response.setFilters(setDefaultFiltersForEntity(entity, searchParams));
        }

        TaskSort selectedSort = response.getSort()
            .stream()
            .filter(sort -> BooleanUtils.isTrue(sort.getIsSelected()))
            .findFirst()
            .map(Function.identity())
            .orElse(null);

        BoolQueryBuilder mustQuery = searchUtils.getQueryForSearchableFields(response.getSearchableFields(), searchParams);

        BoolQueryBuilder shouldQuery = searchUtils.getQueryForFilterableFields(response.getFilters(), searchParams);

//        SortBuilder<?> sortBuilder = getSortBuilder(Objects.requireNonNull(selectedSort));

        List<TermsAggregationBuilder> aggregationBuilders = searchUtils.getAggregationsForFilters(searchParams);

        SearchRequest searchRequest = new SearchRequest("TASK_SEARCH_INDEX");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        boolQuery.must(mustQuery);
        boolQuery.must(shouldQuery);

        searchSourceBuilder.query(boolQuery);
        aggregationBuilders.forEach(searchSourceBuilder::aggregation);

        if (response.getPageNo() == 0) {
            searchSourceBuilder.from(0);
            searchSourceBuilder.size(50);
        } else {
            searchSourceBuilder.from((response.getPageNo() - 1) * response.getPageSize());
            searchSourceBuilder.size(response.getPageSize());
        }

        searchSourceBuilder.trackTotalHits(true);

        searchRequest.source(searchSourceBuilder);

        SearchResponse searchResponse = elasticSearchClient.search(searchRequest, searchUtils.getRequestOptions(200));
        return response;
    }

    private List<TaskSearchFilter> setDefaultFiltersForEntity(String entity, SearchParam searchParams) {
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

    private List<TaskSearchableField> setDefaultSearchableFieldsForEntity(String entity, SearchParam searchParams) {
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

//    private SortBuilder<?> getSortBuilder(TaskSort selectedSort, SearchParam searchParams) {
//        RAPSearchSort selectedRapSearchSort = RAPSearchSort.fromString(selectedSort.getFieldId());
//        return Objects.requireNonNull(selectedRapSearchSort)
//            .getSortBuilder()
//            .apply(SortOrder.fromString(selectedSort.getOrder()));
//    }
}
