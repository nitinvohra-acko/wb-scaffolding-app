package com.acko.tool.entity.action;

import com.acko.tool.dto.EventDTO;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.HashMap;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class ExecuteActionDTO {
    private EventAction action;
    private String referenceTaskId;
    private EventDTO event;
}
