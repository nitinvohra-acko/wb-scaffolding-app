package com.acko.tool.utils;

import com.acko.tool.entity.Search.SearchFilterAggregatedOption;
import com.acko.tool.entity.Search.SearchParam;
import com.acko.tool.entity.Search.SearchParamField;
import com.acko.tool.entity.Search.TaskSearchFilter;
import com.acko.tool.entity.Search.TaskSearchableField;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.client.HttpAsyncResponseConsumerFactory;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@RequiredArgsConstructor
public class SearchUtils {
    RequestOptions REQUEST_OPTIONS = null;
    public BoolQueryBuilder getQueryForSearchableFields(List<TaskSearchableField> searchableFields, SearchParam searchParam) {
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        searchableFields.forEach(searchableField -> {
            String variableNameForField = getVariableNameForField(searchableField.getFieldName(), searchParam);
            if(Objects.nonNull(variableNameForField) && Objects.nonNull(searchableField.getValue())) {
                boolQuery.must(QueryBuilders.matchQuery(variableNameForField, searchableField.getValue()));
            }
        });
        return boolQuery;
    }

    public BoolQueryBuilder getQueryForFilterableFields(List<TaskSearchFilter> filters, SearchParam searchParam) {
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        filters.forEach(filter -> {
            String variableNameForField = getVariableNameForField(filter.getFieldName(), searchParam);
            if(Objects.nonNull(variableNameForField) && Objects.nonNull(filter.getOptions())) {
                filter.getOptions().stream().filter(SearchFilterAggregatedOption::isSelected).forEach(option -> {
                    boolQuery.should(QueryBuilders.matchQuery(variableNameForField, option.getValue()));
                });
            }
        });
        return boolQuery;
    }

    private String getVariableNameForField(String fieldName, SearchParam searchParam) {
        // return the variable name for the field name
        for(SearchParamField searchParamField : searchParam.getParams()) {
            if(searchParamField.getFieldName().equals(fieldName)) {
                return searchParamField.getVariableName();
            }
        }
        return null;
    }

    public List<TermsAggregationBuilder> getAggregationsForFilters(SearchParam searchParam) {
        // return the aggregation builders for the filters
        return searchParam.getParams().stream().map(searchParamField -> {
            if(searchParamField.getIsFilterable()) {
                return AggregationBuilders.terms(searchParamField.getFieldName()).field(searchParamField.getVariableName());
            } else {
                return null;
            }
        }).filter(Objects::nonNull).toList();
    }

    public RequestOptions getRequestOptions(Integer bufferLimitInMB) {
        if(Objects.nonNull(REQUEST_OPTIONS)){
            return REQUEST_OPTIONS;
        }
        RequestOptions.Builder builder = RequestOptions.DEFAULT.toBuilder();
        if(Objects.nonNull(bufferLimitInMB)) {
            builder.setHttpAsyncResponseConsumerFactory(
                new HttpAsyncResponseConsumerFactory
                    .HeapBufferedResponseConsumerFactory(bufferLimitInMB * 1024 * 1024));
        }
        REQUEST_OPTIONS = builder.build();
        return REQUEST_OPTIONS;
    }
}
