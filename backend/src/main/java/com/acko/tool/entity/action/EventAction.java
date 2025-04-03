package com.acko.tool.entity.action;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("EventAction")
@AllArgsConstructor
@Builder(toBuilder = true)
@Data
@NoArgsConstructor
public class EventAction {
    private String eventId;
    private String action;
    private String condition;
    private List<String> options;
    private boolean isActive = true;
}
