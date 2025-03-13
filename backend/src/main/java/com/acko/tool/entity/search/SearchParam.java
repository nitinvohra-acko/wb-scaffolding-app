package com.acko.tool.entity.search;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Document("SearchParam")
@AllArgsConstructor
@Builder(toBuilder = true)
@Data
@NoArgsConstructor
public class SearchParam {
    @Id
    private String id;

    @NonNull
    private String entity;
    private List<SearchParamField> params;
    private boolean isActive = true;
    @CreatedDate
    private Date createdDate;

    @LastModifiedDate
    private Date updatedDate;
}
