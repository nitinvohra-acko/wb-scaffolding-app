package com.acko.tool.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("TaskHistory")
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class TaskHistory<T> {

    @Id
    private String id;
    private String taskId; // Reference to the original task
    private Integer version;
    private String priority;
    private String assignee;
    private String type;
    private String status;
    private Integer calculatedPriority;
    private T businessEntityImpl;
    private Date createdDate;
    private Date updatedDate;
}