package com.acko.tool.entity.search.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class FilterAttributes<T> {
    protected List<FilterOptions> options;
    protected T value;
}
