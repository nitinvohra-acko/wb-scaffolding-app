package com.acko.tool.entity.search.user;

import static com.acko.tool.constants.Constants.MAX_AGGREGATION_BUCKET_SIZE;

import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;

import com.acko.tool.entity.search.SearchType;
import com.acko.tool.entity.search.filter.FilterAttributes;
import com.acko.tool.entity.search.filter.RangeValue;
import com.acko.tool.utils.DateUtil;

import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.json.JsonData;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@SuppressWarnings("rawtypes")
public enum UserFilter {
    
	GROUP(SearchType.term, "Group", UserFilter::getQueryGroup, UserFilter::getAggregationGroup),
	IS_ACTIVE(SearchType.term, "Is Active", UserFilter::getQueryIsActive, UserFilter::getAggregationIsActive),
    CREATED_DATE(SearchType.range, "Created date", UserFilter::getQueryCreatedDate, null),
    LAST_UPDATED_DATE(SearchType.range, "Last updated date", UserFilter::getQueryLastUpdatedDate, null);

    private SearchType searchType;
    private String displayName;
    private Function<FilterAttributes, Query> query;
    private Supplier<Aggregation> aggregation;

    public static UserFilter fromString(String string) {
        for (UserFilter filter : UserFilter.values()) {
            if (filter.name().equalsIgnoreCase(string)) {
                return filter;
            }
        }
        return null;
    }
    
    /**** QUERIES ****/
	private static Query getQueryGroup(FilterAttributes<List<String>> attributes) {
		return Query.of(q -> q
                .terms(t -> t
                        .field("group")
                        .terms(t1 -> t1.value(attributes.getValue().stream()
                                .map(FieldValue::of)
                                .collect(Collectors.toList())))
                ));
	}
    
    private static Query getQueryIsActive(FilterAttributes<List<String>> attributes) {
    	return Query.of(q -> q
                .terms(t -> t
                        .field("active")
                        .terms(t1 -> t1.value(attributes.getValue().stream()
                                .map(FieldValue::of)
                                .collect(Collectors.toList())))
                ));
    }
    
    private static Query getQueryCreatedDate(FilterAttributes<RangeValue> attributes) {
        String from = StringUtils.isNotEmpty(attributes.getValue().getFrom()) ? DateUtil.getDateInUTC(attributes.getValue().getFrom()) : null;
        String to = StringUtils.isNotEmpty(attributes.getValue().getTo()) ? DateUtil.getEndOfDayInUTC(attributes.getValue().getTo()) : null;

        if (Objects.nonNull(from) && Objects.nonNull(to)) {
			return Query.of(q -> q.range(r -> r.field("createdDate").gte(JsonData.of(from)).lte(JsonData.of(to))));
        } else if (Objects.nonNull(from)) {
        	return Query.of(q -> q.range(r -> r.field("createdDate").gte(JsonData.of(from))));
        } else if (Objects.nonNull(to)) {
        	return Query.of(q -> q.range(r -> r.field("createdDate").lte(JsonData.of(to))));
        }
        return null;
    }
    
    private static Query getQueryLastUpdatedDate(FilterAttributes<RangeValue> attributes) {
        String from = StringUtils.isNotEmpty(attributes.getValue().getFrom()) ? DateUtil.getDateInUTC(attributes.getValue().getFrom()) : null;
        String to = StringUtils.isNotEmpty(attributes.getValue().getTo()) ? DateUtil.getEndOfDayInUTC(attributes.getValue().getTo()) : null;

        if (Objects.nonNull(from) && Objects.nonNull(to)) {
			return Query.of(q -> q.range(r -> r.field("updatedDate").gte(JsonData.of(from)).lte(JsonData.of(to))));
        } else if (Objects.nonNull(from)) {
        	return Query.of(q -> q.range(r -> r.field("updatedDate").gte(JsonData.of(from))));
        } else if (Objects.nonNull(to)) {
        	return Query.of(q -> q.range(r -> r.field("updatedDate").lte(JsonData.of(to))));
        }
        return null;
    }
    
    /**** AGGREGATIONS ****/
	private static Aggregation getAggregationGroup() {
		return Aggregation.of(a -> a.terms(t -> t.name(GROUP.name()).field("group.keyword").size(MAX_AGGREGATION_BUCKET_SIZE)));
	}
    
    private static Aggregation getAggregationIsActive() {
    	return Aggregation.of(a -> a.terms(t -> t.name(IS_ACTIVE.name()).field("active").size(MAX_AGGREGATION_BUCKET_SIZE)));
    }
    
}