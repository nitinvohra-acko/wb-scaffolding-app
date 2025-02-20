package com.acko.tool.utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ReflectionUtil {
    public static List<String> getFieldPaths(Class<?> clazz, String parent) {
        List<String> fieldPaths = new ArrayList<>();
        for (Field field : clazz.getDeclaredFields()) {
            String fieldPath = parent.isEmpty() ? field.getName() : parent + "." + field.getName();
            fieldPaths.add(fieldPath);

            // If the field is a List, get the generic type and recurse
            if (List.class.isAssignableFrom(field.getType())) {
                Class<?> genericType = getGenericType(field);
                if (genericType != null) {
                    fieldPaths.addAll(getFieldPaths(genericType, fieldPath));
                }
            } else if (!field.getType().isPrimitive() && !field.getType().getName().startsWith("java.")) {
                fieldPaths.addAll(getFieldPaths(field.getType(), fieldPath));
            }
        }
        return fieldPaths;
    }

    private static Class<?> getGenericType(Field field) {
        System.out.println("Hello111");
        try {
            return (Class<?>) ((java.lang.reflect.ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
        } catch (Exception e) {
            System.out.println("Hello");
            return null;
        }
    }
}
