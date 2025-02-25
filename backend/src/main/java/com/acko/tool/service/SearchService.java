package com.acko.tool.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.acko.tool.entity.search.SearchParam;
import com.acko.tool.entity.search.SearchParamField;
import com.acko.tool.entity.search.TaskSearch;
import com.acko.tool.entity.search.TaskSearchFilter;
import com.acko.tool.entity.search.TaskSearchableField;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.acko.tool.exception.ResourceNotFoundException;
import com.acko.tool.repository.SearchParamRepository;
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
//    @Autowired
    private final SearchParamRepository searchParamRepository;
    private final SearchUtils searchUtils;

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

    public Object searchTasks(TaskSearch searchRequestInput, String entity) throws IOException {
        SearchParam searchParams = getParamsForEntity(entity);
        TaskSearch response = new TaskSearch();

        response.setPageNo(Objects.nonNull(searchRequestInput.getPageNo())? searchRequestInput.getPageNo(): 1);
        response.setPageSize(Objects.nonNull(searchRequestInput.getPageSize())? searchRequestInput.getPageSize(): 50);

        List<TaskSearchableField> searchableFields = searchRequestInput.getSearchableFields();
        if(Objects.isNull(searchableFields) || searchableFields.isEmpty()) {
            response.setSearchableFields(setDefaultSearchableFieldsForEntity(entity, searchParams));
        } else {
            response.setSearchableFields(searchableFields);
        }

        List<TaskSearchFilter> searchFilters = searchRequestInput.getFilters();
        if(Objects.isNull(searchFilters) || searchFilters.isEmpty()) {
            response.setFilters(setDefaultFiltersForEntity(entity, searchParams));
        } else {
            response.setFilters(searchFilters);
        }

        List<Query> mustQueries = searchUtils.getQueryForSearchableFields(response.getSearchableFields(), searchParams);

        List<Query> shouldQueries = searchUtils.getQueryForFilterableFields(response.getFilters(), searchParams);

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

        Query finalQuery = Query.of(q -> q.bool(b -> b.must(finalMustQueries)));

        SearchResponse<Map> elasticResponse = elasticSearchClient.search(s -> s
                .index("tasks")
                .query(finalQuery)
                .aggregations(aggregationBuilders),
            Map.class
        );

        HashMap<String, Object> res = new HashMap<>();
        ArrayList<Object> resultArray = new ArrayList<>();
        HashMap<String, Object> aggregationResponse = new HashMap<>();
        for (Hit<Map> hit : elasticResponse.hits().hits()) {
//            System.out.println("Document ID: " + hit.id());
//            System.out.println("Document Source: " + hit.source());
            resultArray.add(hit.source());
        }
        res.put("result", resultArray);


        aggregationBuilders.keySet().forEach(aggName -> {
            if(elasticResponse.aggregations() != null && elasticResponse.aggregations().get(aggName) != null) {
                System.out.println("Aggregation: " + aggName);
                elasticResponse.aggregations().get(aggName).sterms().buckets().array().forEach(bucket -> {
                    System.out.println("  Key: " + bucket.key() + " Count: " + bucket.docCount());
                    aggregationResponse.put(aggName + "__" +bucket.key().stringValue(), bucket.docCount());
                });
            }
        });
        res.put("aggregations", aggregationResponse);
        return res;
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
