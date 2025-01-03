package com.acko.tool.entity;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("Task")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
@Builder(toBuilder = true)
@Data
@NoArgsConstructor
public class Task<T> {

	@Id
	private String id;
	private String priority;
	private String assignee;
	private String type;
	private String status;
	private Integer calculatedPriority;
	private T businessEntityImpl;

	@CreatedDate
	private Date createdDate;

	@LastModifiedDate
	private Date updatedDate;

}
