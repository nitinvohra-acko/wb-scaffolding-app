package com.acko.tool.exception.enums;

import com.acko.tool.exception.dto.ApiError;
import com.acko.tool.exception.dto.ErrorObject;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@AllArgsConstructor
@Getter
public enum ErrorCode {
  /*
   * INPUT_VALIDATION
   * */
  INPUT_VALIDATION_ERROR_CLIENT(
          ErrorGroups.INPUT_VALIDATION, "Client Input Validation Failed", "001"),
  HTTP_ERROR_CLIENT(ErrorGroups.INPUT_VALIDATION, "Api Validation Failed", "002"),
  CLIENT_JSON_ERROR(ErrorGroups.INPUT_VALIDATION, "Invalid Input JSON", "003"),
  INVALID_STATE_CLIENT(ErrorGroups.INPUT_VALIDATION, "Invalid State", "004"),
  CONSTRAINT_VIOLATION_ERROR(ErrorGroups.INPUT_VALIDATION, "Validation Failed", "005"),
  MESSAGE_ATTRIBUTE_INVALID(ErrorGroups.INPUT_VALIDATION, "Message Attribute Invalid", "006"),
  DECRYPTION_FAILED_CLIENT(ErrorGroups.INPUT_VALIDATION, "Decryption Failed", "007"),
  OBJECT_DOES_NOT_EXIST_CLIENT(ErrorGroups.NON_EXISTENCE_RESOURNCE, "Not Found", "008"),
  VALIDATION_EXCEPTION(ErrorGroups.INPUT_VALIDATION, "Api Validation Failed", "009"),
  METHOD_ARGUMENT_NOT_VALID_EXCEPTION(
          ErrorGroups.INPUT_VALIDATION, "Client Input Validation Failed", "010"),
  HTTP_MESSAGE_NOT_READABLE_EXCEPTION(ErrorGroups.INPUT_VALIDATION, "Data parsing failed", "011"),
  HTTP_REQUEST_METHOD_NOT_SUPPORTED_EXCEPTION(
          ErrorGroups.INPUT_VALIDATION, "Method not supported", "012"),
  PAYMENT_ERROR(ErrorGroups.INPUT_VALIDATION, "Payment Failure", "013"),

  /*
   * UNAVAILABLE*/
  HTTP_CONNECTION_REFUSED_ERROR(ErrorGroups.UNAVAILABLE, " Http Connection Refused ", "001"),
  RESOURCE_NOT_FOUND(ErrorGroups.UNAVAILABLE, " Resource Not Found", "002"),

  /*DATABASE ERRORS*/
  DATA_ACCESS_ERROR(ErrorGroups.DATABASE_ERRORS, "Data Access Error", "001"),
  INVALID_QUERY_ERROR(ErrorGroups.DATABASE_ERRORS, "Query Execution Failed", "002"),

  /*PROCESSING_ERRORS*/
  BAD_CONFIGURATION_ERROR(ErrorGroups.PROCESSING_ERRORS, "Bad configuration error", "001"),
  ENCRYPT_DECRYPT_ERROR_SERVER(
          ErrorGroups.PROCESSING_ERRORS, "Encryption-Decryption Error", "002"),

  /*Server Errors*/
  HTTP_ERROR_SERVER(ErrorGroups.SERVER_ERRORS, "Internal Server Error", "001"),

  /*GENERAL Errors*/
  UNCATEGORISED_ERROR(ErrorGroups.GENERAL_ERRORS, "Internal Server Error", "001"),
  SERVER_JSON_ERROR(ErrorGroups.GENERAL_ERRORS, "Internal Server Error", "002"),
  NULL_POINTER_ERROR_SERVER(ErrorGroups.GENERAL_ERRORS, "Null Pointer Error", "003"),

  /* SQS Errors*/
  SQS_SEND_MESSAGE_FAILED(ErrorGroups.SQS_ERRORS, "SQS Send Message Failed", "001"),

  /* SQS Errors*/
  AUTHENTICATION_FAILED(ErrorGroups.UN_AUTHORIZED, "AUTHENTICATION_FAILED", "001");

  private ErrorGroups group;
  private String message;
  private String code;

  public static ErrorObject getErrorObject(ErrorCode err, String traceId) {
    return ErrorObject.builder()
            .referenceId(traceId)
            .statusCode(err.getGroup().getHttpStatus().value())
            .build();
  }

  public static ResponseEntity<Object> getErrorResponseEntity(
          String message, ErrorCode errorCode, String traceId) {
    ErrorObject error = ErrorCode.getErrorObject(errorCode, traceId);
    ApiError apiError = new ApiError(errorCode, error, message);
    return new ResponseEntity<>(apiError, errorCode.getGroup().getHttpStatus());
  }
}
