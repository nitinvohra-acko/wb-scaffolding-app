package com.acko.tool.entity.search;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class TaskSearchFilter {
    private String fieldDisplayName;
    private String fieldName;
    private String fieldType;
    private List<SearchFilterAggregatedOption> options;
}
