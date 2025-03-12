package com.acko.tool.entity.search.user;

import java.util.function.Function;

import co.elastic.clients.elasticsearch._types.FieldSort;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserSort {
    
    CREATED_DATE("Created date", true, UserSort::getSortPaymentDate),
    LAST_UPDATED_DATE("Last updated date", false, UserSort::getSortLastUpdatedDate);

    private String displayName;
    private boolean defaultSelected;
    private Function<SortOrder, SortOptions> sortBuilder;
    
	private static SortOptions getSortPaymentDate(SortOrder sortOrder) {
		return new SortOptions.Builder()
				.field(new FieldSort.Builder()
						.field("createdDate")
						.order(sortOrder)
						.build())
				.build();
	}
    
    private static SortOptions getSortLastUpdatedDate(SortOrder sortOrder) {
    	return new SortOptions.Builder()
				.field(new FieldSort.Builder()
						.field("updatedDate")
						.order(sortOrder)
						.build())
				.build();
    }
    
	public static UserSort fromString(String string) {
		for (UserSort filter : UserSort.values()) {
			if (filter.name().equalsIgnoreCase(string)) {
				return filter;
			}
		}
		return null;
	}
}
