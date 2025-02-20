package com.acko.tool.entity.Search;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TaskSearch {
    private List<TaskSearchableField> searchableFields;
    private List<TaskSearchFilter> filters;
    private List<TaskSort> sort;
    private String searchStr;
    private List<Object> result;    // Definitely should not be this. Set correct type here.
    private long totalCount;
    private Integer pageNo;
    private Integer pageSize;
}
