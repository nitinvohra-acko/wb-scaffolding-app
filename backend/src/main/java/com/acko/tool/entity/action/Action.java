package com.acko.tool.entity.action;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Action")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
@Builder(toBuilder = true)
@Data
@NoArgsConstructor
public class Action {
    private String eventId;
    private String action;
    private ActionProperties actionProperties;
    private Boolean isActive;
}
