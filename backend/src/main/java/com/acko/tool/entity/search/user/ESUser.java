package com.acko.tool.entity.search.user;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;


@Data
@Document(indexName = "#{@environment.getProperty('elasticsearch.userIndex')}")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ESUser {
	
	@Id
	private String id;
	private String username;
	private String email;
	private String firstName;
	private String lastName;
	private String group;
	private boolean active;
	
	@Field(type = FieldType.Object)
	private Map<String, Object> customAttributes;
	
	@CreatedDate
	@Field(type = FieldType.Date)
	private Date createdDate;

	@LastModifiedDate
	@Field(type = FieldType.Date)
	private Date updatedDate;
}


