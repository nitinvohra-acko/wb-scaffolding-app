package com.acko.tool.entity.search.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum UserSearchFields {
    
    ID("id.keyword"),
    USERNAME("username"),
    FIRST_NAME("firstName"),
    LAST_NAME("lastName"),
    EMAIL("email");
    
    private String fieldName;
    
    public static String[] getAllSearchStringFields() {
        return Arrays.stream(UserSearchFields.values())
                .map(UserSearchFields::getFieldName)
                .toArray(String[]::new);
    }
}