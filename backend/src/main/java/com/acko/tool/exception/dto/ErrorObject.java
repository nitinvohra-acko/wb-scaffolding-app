package com.acko.tool.exception.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ErrorObject {
    private String referenceId;
    private int statusCode;
}