package com.acko.tool.utils;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import com.acko.tool.entity.search.SearchFilterAggregatedOption;
import com.acko.tool.entity.search.SearchParam;
import com.acko.tool.entity.search.SearchParamField;
import com.acko.tool.entity.search.TaskSearchFilter;
import com.acko.tool.entity.search.TaskSearchableField;
import com.acko.tool.enums.TaskType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.client.HttpAsyncResponseConsumerFactory;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SearchUtils {

    RequestOptions REQUEST_OPTIONS = null;

    public Class<?> isEntityValid(String entity) throws NoSuchFieldException {
        // check if the entity is valid
        String normalizedInput = entity.trim().toUpperCase();
        TaskType taskType = null;
        try {
            taskType = TaskType.valueOf(normalizedInput);
        } catch (IllegalArgumentException e) {
            throw new NoSuchFieldException("Invalid task type: " + entity);
        }
        return taskType.getTaskClass();
    }

    public List<Query> getQueryForSearchableFields(List<TaskSearchableField> searchableFields, SearchParam searchParam) {
        List<Query> mustQueries = new ArrayList<>();
        searchableFields.forEach(searchableField -> {
            String variableNameForField = getVariableNameForField(searchableField.getFieldName(), searchParam);
            if(Objects.nonNull(variableNameForField) && Objects.nonNull(searchableField.getValue())) {
                TermQuery termQuery = TermQuery.of(t -> t
                    .field(variableNameForField )
                    .value(searchableField.getValue().toString())
                );
                mustQueries.add(Query.of(q -> q.term(termQuery)));
            }
        });
        return mustQueries;
    }

    public List<Query> getQueryForFilterableFields(List<TaskSearchFilter> filters, SearchParam searchParam) {
        List<Query> shouldQueries = new ArrayList<>();
        filters.forEach(filter -> {
            String variableNameForField = getVariableNameForField(filter.getFieldName(), searchParam);
            if(Objects.nonNull(variableNameForField) && Objects.nonNull(filter.getOptions())) {
                filter.getOptions().stream()
                    .filter(x-> Objects.nonNull(x.getIsSelected()) && x.getIsSelected())
                    .forEach(option -> {
                        TermQuery termQuery = TermQuery.of(t -> t
                            .field(variableNameForField)
                            .value(option.getValue())
                        );
                        shouldQueries.add(Query.of(q -> q.term(termQuery)));
                    });
            }
        });
        return shouldQueries;
    }

    public List<Query> getQueryForGlobalSearch(String searchStr, SearchParam searchParam) {
        List<Query> shouldQueries = new ArrayList<>();
        if(Objects.isNull(searchStr) || searchStr.isEmpty()) return shouldQueries;

        for(SearchParamField searchParamField : searchParam.getParams()) {
            String variableNameForField = getVariableNameForField(searchParamField.getFieldName(), searchParam);
            if(searchParamField.getIsSearchable()) {
                TermQuery termQuery = TermQuery.of(t -> t
                    .field(variableNameForField)
                    .value(searchStr)
                );
                shouldQueries.add(Query.of(q -> q.term(termQuery)));
            }
        }
        return shouldQueries;
    }

    private String getVariableNameForField(String fieldName, SearchParam searchParam) {
        // return the variable name for the field name
        for(SearchParamField searchParamField : searchParam.getParams()) {
            if(searchParamField.getFieldName().equals(fieldName)) {
                if(searchParamField.getVariableName().contains("businessEntityImpl")) {
                    return searchParamField.getVariableName() + ".keyword";
                } else {
                    return searchParamField.getVariableName();
                }
            }
        }

        return null;
    }

    public Map<String, Aggregation> getAggregationsForFilters(SearchParam searchParam) {
        // return the aggregation builders for the filters
        Map<String, Aggregation> aggregations = new HashMap<>();
        for(SearchParamField searchParamField : searchParam.getParams()) {
            if(searchParamField.getIsFilterable()) {
                String aggName = searchParamField.getFieldName().replace(".", "_") + "_agg";
                aggregations.put(aggName, Aggregation.of(a -> a
                    .terms(t -> t.field(searchParamField.getFieldName()))
                ));
            }
        }
        return aggregations;
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
