package com.acko.tool.entity.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class TaskSort {
    private String fieldDisplayName;
    private String fieldName;
    private String order;
    private Boolean isSelected;
}
