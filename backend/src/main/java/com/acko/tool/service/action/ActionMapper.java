package com.acko.tool.service.action;

import com.acko.tool.entity.action.EventAction;
import com.acko.tool.entity.action.ActionMetadataDTO;
import com.acko.tool.entity.action.ExecuteActionDTO;

public interface ActionMapper {
    ActionMetadataDTO getMetadata();
    EventAction saveAction(EventAction saveActionDTO);
    String getActionType();
    String getActionName();
    ExecuteActionDTO executeAction(ExecuteActionDTO executeActionObject) throws Exception;
}
