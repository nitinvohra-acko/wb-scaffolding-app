package com.acko.tool.entity.search.filter;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@Builder(toBuilder = true)
@NoArgsConstructor
public class FilterAttributesRange extends FilterAttributes<RangeValue> {
}

