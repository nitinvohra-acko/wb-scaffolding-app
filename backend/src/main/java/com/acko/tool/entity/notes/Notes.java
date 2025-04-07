package com.acko.tool.entity.notes;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@AllArgsConstructor
@Builder(toBuilder = true)
@Data
@Document("Notes")
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Notes {

    @Id
    private String entityId;

    @Field("tag")
    private String tag;

    @Field("notes")
    private List<NotesData> notes;

    @Field("created_date")
    @CreatedDate
    private Date createdDate;

    @Field("updated_date")
    @LastModifiedDate
    private Date updatedDate;
}
