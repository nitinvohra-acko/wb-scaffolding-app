package com.acko.tool.entity.search.filter;

import com.acko.tool.entity.search.SearchType;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = FilterTerm.class, name = "term"),
        @JsonSubTypes.Type(value = FilterRange.class, name = "range"),
})
public abstract class Filter<T> {

    private SearchType type;
    private String fieldId;
    private String fieldName;
    protected T attributes;
}