package com.acko.tool.exception.dto;

import com.acko.tool.exception.enums.ErrorCode;

import lombok.Data;

@Data
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
