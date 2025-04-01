package com.acko.tool.entity.search;

import com.acko.tool.entity.search.filter.Filter;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class TaskSearch {
    private List<TaskSearchableField> searchableFields;
    private List<Filter<?>> filters;
    private List<TaskSort> sort;
    private String searchStr;
    private List<Object> result;    // Definitely should not be this. Set correct type here.
    private long totalCount;
    private Integer pageNo;
    private Integer pageSize;
}
