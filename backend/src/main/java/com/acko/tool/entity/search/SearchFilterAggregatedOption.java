package com.acko.tool.entity.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class SearchFilterAggregatedOption {
    private String value;
    private Long count;
    private Boolean isSelected;
}
