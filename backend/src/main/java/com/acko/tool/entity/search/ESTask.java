package com.acko.tool.entity.search;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.Data;


@Data
@Document(indexName = "#{@environment.getProperty('elasticsearch.taskIndex')}")
public class ESTask {
	
    @Id
    private String id;

    @Field(type = FieldType.Keyword)
    private String priority;

    @Field(type = FieldType.Keyword)
    private String assignee;

    @Field(type = FieldType.Keyword)
    private String type;

    @Field(type = FieldType.Keyword)
    private String status;

    @Field(type = FieldType.Integer)
    private Integer calculatedPriority;

    // Dynamic JSON field
    @Field(type = FieldType.Object)
    private Map<String, Object> businessEntityImpl;

    @CreatedDate
    @Field(type = FieldType.Date)
    private Date createdDate;

    @LastModifiedDate
    @Field(type = FieldType.Date)
    private Date updatedDate;
}


