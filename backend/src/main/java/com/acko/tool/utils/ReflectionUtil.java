package com.acko.tool.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ReflectionUtil {
    // Set of classes that we consider "leaf" types
    public static List<HashMap<String, String>> extractLeafNodes(Class<?> clazz, String prefix) {
        List<HashMap<String, String>> leafNodes = new ArrayList<>();
        extractLeafNodesHelper(clazz, prefix, leafNodes);
        return leafNodes;
    }

    private static void extractLeafNodesHelper(Class<?> clazz, String prefix, List<HashMap<String, String>> leafNodes) {
        for (Field field : clazz.getDeclaredFields()) {
            Class<?> fieldType = field.getType();
            String fieldName = prefix.isEmpty() ? toSnakeCase(field.getName()) : prefix + "." + toSnakeCase(field.getName());

            if (Collection.class.isAssignableFrom(fieldType)) {
                ParameterizedType listType = (ParameterizedType) field.getGenericType();
                Class<?> listClass = (Class<?>) listType.getActualTypeArguments()[0];

                if (isPrimitiveOrCommonType(listClass)) {
                    HashMap<String, String> map = new HashMap<>();
                    map.put("type", listClass.getSimpleName());
                    map.put("variable", "businessEntityImpl."+fieldName);
//                    leafNodes.add(fieldName + " : L" + listClass.getSimpleName());
                    leafNodes.add(map);
                } else {
                    extractLeafNodesHelper(listClass, fieldName, leafNodes);
                }
            } else if (isPrimitiveOrCommonType(fieldType)) {
                HashMap<String, String> map = new HashMap<>();
                map.put("type", fieldType.getSimpleName());
                map.put("variable", "businessEntityImpl."+fieldName);
//                leafNodes.add(fieldName + " : " + fieldType.getSimpleName());
                leafNodes.add(map);
            } else {
                extractLeafNodesHelper(fieldType, fieldName, leafNodes);
            }
        }
    }

    private static boolean isPrimitiveOrCommonType(Class<?> clazz) {
        return clazz.isPrimitive() || clazz == String.class || Number.class.isAssignableFrom(clazz) ||
            clazz == Integer.class || clazz == Long.class || clazz == Double.class || clazz == Float.class ||
            clazz == Boolean.class || clazz == Short.class || clazz == Byte.class || clazz == Character.class ||
            clazz == OffsetDateTime.class || clazz == LocalDate.class || clazz == LocalDateTime.class;
    }

    private static String toSnakeCase(String input) {
        return input.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
    }
}
