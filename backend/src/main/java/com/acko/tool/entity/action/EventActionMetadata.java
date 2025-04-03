package com.acko.tool.entity.action;

import com.acko.tool.entity.search.SearchParamField;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.HashMap;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class EventActionMetadata {
    private List<EventLabelDTO> eventsList;
    private List<ActionMetadataDTO> actionsList;
    private List<EntityParam> entityParams;
}
