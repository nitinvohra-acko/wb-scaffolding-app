package com.acko.tool.entity.search.sort;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Sort {
    private String fieldId;
    private String fieldName;
    private String order;
    private Boolean isSelected;
}

