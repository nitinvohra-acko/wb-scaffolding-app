package com.acko.tool.entity.search.event;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Builder;
import lombok.Data;


@Data
@Document(indexName = "#{@environment.getProperty('elasticsearch.eventIndex')}")
@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ESEvent {
	
	@Id
	private String id;
	private String eventType;
	private String eventName;
	private String channel;
	private String userId;
	
	@Field(type = FieldType.Object)
	private Map<String, Object> properties;
	
	@CreatedDate
	@Field(type = FieldType.Date)
	private Date timestamp;
}


