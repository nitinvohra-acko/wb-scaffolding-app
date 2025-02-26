package com.acko.tool.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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
    private static final Set<Class<?>> LEAF_TYPES = new HashSet<>(Arrays.asList(
        String.class,
        Boolean.class, Byte.class, Character.class, Short.class,
        Integer.class, Long.class, Float.class, Double.class,
        Date.class // add more types such as LocalDate, LocalDateTime if needed.
    ));

    public static List<String> getFieldPaths(Class<?> clazz, String parent) {
        List<String> fieldPaths = new ArrayList<>();
        for (Field field : clazz.getDeclaredFields()) {
            // Skip static fields.
            if (Modifier.isStatic(field.getModifiers())) {
                continue;
            }
            String fieldPath = parent.isEmpty() ? field.getName() : parent + "." + field.getName();
            fieldPaths.add(fieldPath);

            // If field is of leaf type, do not expand further.
            if (isLeafType(field.getType())) {
                continue;
            }

            // If the field is a List, handle its generic type.
            if (List.class.isAssignableFrom(field.getType())) {
                Class<?> genericType = getGenericType(field);
                if (genericType != null && !isLeafType(genericType) && isCustomClass(genericType)) {
                    fieldPaths.addAll(getFieldPaths(genericType, fieldPath));
                }
            } else if (isCustomClass(field.getType())) {
                // For non-collection custom classes, expand recursively.
                fieldPaths.addAll(getFieldPaths(field.getType(), fieldPath));
            }
        }
        return fieldPaths;
    }

    private static Class<?> getGenericType(Field field) {
        try {
            return (Class<?>) ((ParameterizedType) field.getGenericType())
                .getActualTypeArguments()[0];
        } catch (Exception e) {
            return null;
        }
    }

    private static boolean isCustomClass(Class<?> clazz) {
        if (clazz.getPackage() == null) {
            return false;
        }
        String packageName = clazz.getPackage().getName();
        return !(packageName.startsWith("java.") || packageName.startsWith("javax."));
    }

    // Determines if the class should be considered a leaf value.
    private static boolean isLeafType(Class<?> clazz) {
        return clazz.isPrimitive() || LEAF_TYPES.contains(clazz);
    }
}
