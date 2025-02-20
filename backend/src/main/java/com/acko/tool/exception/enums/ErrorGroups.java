package com.acko.tool.exception.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorGroups {
  INPUT_VALIDATION("BAD REQUEST", HttpStatus.BAD_REQUEST),
  CONFLICT_ERROR("CONFLICT_", HttpStatus.CONFLICT),
  UN_AUTHORIZED("UNAUERR_", HttpStatus.UNAUTHORIZED),
  NON_EXISTENCE_RESOURNCE("NERERR", HttpStatus.NOT_FOUND),
  UNAVAILABLE("UNAERR_", HttpStatus.SERVICE_UNAVAILABLE),
  DATABASE_ERRORS("DBERR_", HttpStatus.INTERNAL_SERVER_ERROR),
  PROCESSING_ERRORS("PERR_", HttpStatus.INTERNAL_SERVER_ERROR),
  SERVER_ERRORS("SERR_", HttpStatus.INTERNAL_SERVER_ERROR),
  GENERAL_ERRORS("GERR_", HttpStatus.INTERNAL_SERVER_ERROR),
  SQS_ERRORS("SQSERR_", HttpStatus.INTERNAL_SERVER_ERROR),
  ;
  private String errorPrefix;
  private HttpStatus httpStatus;
}
