package com.acko.tool.entity.Search;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class SearchParamField {
    private String fieldDisplayName;    // This is a display name of description of the field being searched
    private String fieldName;   // This is what FE will send for search
    private String variableName;    // This is where it is in elastic
    private String fieldType;       // text, date, number
    private Boolean isSearchable;    // This is if we want to give text entry search
    private Boolean isFilterable;    // This is for fields where we have to show aggregated values

}
