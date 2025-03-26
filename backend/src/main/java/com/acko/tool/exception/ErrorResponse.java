package com.acko.tool.exception;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class ErrorResponse {
    private String errorCode;
    private String text;
    private Map<String, Object> metadata;

}
