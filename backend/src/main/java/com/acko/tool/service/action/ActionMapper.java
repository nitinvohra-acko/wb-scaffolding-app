package com.acko.tool.service.action;

import com.acko.tool.entity.action.Action;
import com.acko.tool.entity.action.EventActionMetadata;
import com.acko.tool.entity.action.ExecuteActionDTO;

public interface ActionMapper {
    EventActionMetadata getMetadata(EventActionMetadata eventActionDTO);
    Action saveAction(Action saveActionDTO);
    String getActionType();
    ExecuteActionDTO executeAction(ExecuteActionDTO executeActionObject) throws Exception;
}
