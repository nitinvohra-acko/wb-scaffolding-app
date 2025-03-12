package com.acko.tool.entity;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("Task")
@AllArgsConstructor
@Builder(toBuilder = true)
@Data
@NoArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type", visible = true)
@JsonSubTypes({
    @Type(value = ProposalTask.class, name = "proposal"),
    @Type(value = AssessmentTask.class, name = "assessment")
})
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
