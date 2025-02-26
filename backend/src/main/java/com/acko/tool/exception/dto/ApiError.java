package com.acko.tool.exception.dto;

import com.acko.tool.exception.enums.ErrorCode;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ApiError {

    private String code;
    private ErrorObject error;
    private String message;

    public ApiError(ErrorCode errCode, ErrorObject error, String message) {
        this.code = errCode.getGroup().getErrorPrefix() ;
        this.message = message;
        this.error = error;
    }
}
