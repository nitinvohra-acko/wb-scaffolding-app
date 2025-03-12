package com.acko.tool.entity.search.user;

import java.util.List;

import com.acko.tool.entity.search.filter.Filter;
import com.acko.tool.entity.search.sort.Sort;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserSearch {
    private List<Filter<?>> filters;
    private List<Sort> sort;
    private String searchStr;
    private List<ESUser> result;
    private long totalCount;
    private Integer pageNo;
    private Integer pageSize;
}
