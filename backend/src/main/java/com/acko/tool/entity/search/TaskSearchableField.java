package com.acko.tool.entity.search;

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
public class TaskSearchableField {
    private String fieldDisplayName;    // Proposal number
    private String fieldName;           // proposal_number
    private String fieldType;           // String, term
    private Object value;               // ALFTP000000000001
}
