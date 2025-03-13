package com.acko.tool.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder(toBuilder = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class WorkflowRequest {
    private String referenceId;
    private String type;
    private String createdBy;
    private String updatedBy;
    private Map<String, Object> inputData;
}
