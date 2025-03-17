package com.acko.tool.service.action;

import com.acko.tool.entity.action.Action;
import com.acko.tool.entity.action.ActionLabelDTO;
import com.acko.tool.entity.action.EventActionMetadata;
import com.acko.tool.entity.action.EventLabelDTO;
import com.acko.tool.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Log4j2
public class ActionService {
    private final List<ActionMapper> actionMappers;

    public EventActionMetadata getMetadata(EventActionMetadata eventActionDTO) {
        // TODO: Get list of events from somewhere.
        eventActionDTO.setEventList(List.of(
            new EventLabelDTO("TASK_CREATED", "Task created"),
            new EventLabelDTO("TELEMER_COMPLETED", "Telemer completed") // Example!
        ));

        // TODO: This can be as is or in constants.
        eventActionDTO.setActionList(List.of(
            new ActionLabelDTO("ASSIGN_TASK", "Assign Task"),
            new ActionLabelDTO("MAIL", "Send Mail")
        ));
        if(Objects.isNull(eventActionDTO.getSelectedAction()) || eventActionDTO.getSelectedAction().isEmpty()) {
            return eventActionDTO;
        }
        ActionMapper action = getActionMapper(eventActionDTO.getSelectedAction());
        if (action == null) {
            throw new ResourceNotFoundException("Invalid action type: " + eventActionDTO.getSelectedAction());
        }
        return action.getMetadata(eventActionDTO);
    }

    public Action saveAction(Action saveActionDTO) {
        ActionMapper action = getActionMapper(saveActionDTO.getAction());
        if (action == null) {
            throw new ResourceNotFoundException("Invalid action type: " + saveActionDTO.getAction());
        }
        return action.saveAction(saveActionDTO);
    }


    private ActionMapper getActionMapper(String actionType) {
        for (ActionMapper actionMapper : actionMappers) {
            if (actionMapper.getActionType().equalsIgnoreCase(actionType)) {
                return actionMapper;
            }
        }
        return null;
    }
}
