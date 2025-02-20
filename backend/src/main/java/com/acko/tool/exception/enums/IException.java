package com.acko.tool.exception.enums;

public interface IException {
    default String getMessage(Object e) {
        return ((Exception) e).getMessage();
    }
}
