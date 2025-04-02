package com.acko.tool.entity.notes;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Document
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class NotesData {
    @Field( "note")
    private String note;

    @Field( "note_by")
    private String noteBy;

    @Field( "date")
    private Date date;
}