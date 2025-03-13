package com.acko.tool.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.extern.slf4j.Slf4j;


@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	
    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<?> handleJsonProcessingException(JsonProcessingException jsonProcessingException) {
        log.error("EXCEPTION : {}", jsonProcessingException, jsonProcessingException);
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setText(jsonProcessingException.getMessage());
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValid(MethodArgumentNotValidException methodArgumentNotValidException) {
        BindingResult bindingResult = methodArgumentNotValidException.getBindingResult();
        FieldError fieldError = (FieldError) bindingResult.getAllErrors().iterator().next();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setText(fieldError.getField() + ": " + fieldError.getDefaultMessage());
        errorResponse.setErrorCode(String.valueOf(HttpStatus.BAD_REQUEST.value()));
        log.error("JacksonException: ", methodArgumentNotValidException);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
        log.error("EXCEPTION : {}", exception, exception);
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setText(exception.getMessage());
        errorResponse.setErrorCode(String.valueOf(HttpStatus.BAD_REQUEST.value()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}