package com.acko.tool.service.action;

import com.acko.tool.dto.EventDTO;
import com.acko.tool.entity.action.EntityParam;
import com.acko.tool.entity.action.EventAction;
import com.acko.tool.entity.action.EventActionMetadata;
import com.acko.tool.entity.action.EventLabelDTO;
import com.acko.tool.entity.action.ExecuteActionDTO;
import com.acko.tool.enums.TaskType;
import com.acko.tool.exception.ResourceNotFoundException;
import com.acko.tool.repository.ActionRepository;
import com.acko.tool.service.SearchService;
import java.util.ArrayList;
import java.util.HashMap;
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
    private final ActionRepository actionRepository;
    private final SearchService searchService;

    public EventActionMetadata getMetadata()
        throws NoSuchFieldException {
        EventActionMetadata eventActionDTO = new EventActionMetadata();
        // TODO: Get list of events from somewhere.
        eventActionDTO.setEventsList(List.of(
            new EventLabelDTO("TASK_CREATED", "Task created"),
            new EventLabelDTO("TASK_STATUS_UPDATED", "Task Status Updated") // Example!
        ));

        eventActionDTO.setActionsList(new ArrayList<>());
        for (ActionMapper actionMapper : actionMappers) {
            eventActionDTO.getActionsList().add(actionMapper.getMetadata());
        }
        eventActionDTO.setEntityParams(new ArrayList<>());

        // Loop over TaskType enums and get getCombinedSearchFields for each
        for (TaskType taskType : TaskType.values()) {
            eventActionDTO.getEntityParams().add(
                new EntityParam()
                    .toBuilder()
                    .name(taskType.name().toLowerCase())
                    .fieldParams(searchService.getCombinedSearchFields(taskType.name().toLowerCase()))
                    .build()
                );
        }

        return eventActionDTO;
    }

    public EventAction saveAction(EventAction saveActionDTO) {
        ActionMapper action = getActionMapper(saveActionDTO.getAction());
        if (action == null) {
            throw new ResourceNotFoundException("Invalid action type: " + saveActionDTO.getAction());
        }
        return action.saveAction(saveActionDTO);
    }

    public EventDTO getActionsForEventAndExecute(EventDTO event) throws Exception {
        List<EventAction> actions = getActionsForEvent(event);
        if(!actions.isEmpty()){
            for (EventAction action : actions) {
                execute(action, event);
            }
        }
        return event;
    }

    private List<EventAction> getActionsForEvent(EventDTO event) {
        List<EventAction> actions = actionRepository.getActionByEventId(event.getEventName(), true);
        if(Objects.isNull(actions) || actions.isEmpty()) {
            return new ArrayList<>();
        } else {
            return actions;
        }
    }

    private ExecuteActionDTO execute(EventAction action, EventDTO event) throws Exception {
        ActionMapper actionMapper = getActionMapper(action.getAction());
        if (actionMapper == null) {
            throw new ResourceNotFoundException("Invalid action type: " + action.getAction());
        }
        ExecuteActionDTO executeActionObject = ExecuteActionDTO.builder().action(action).event(event).build();
        return actionMapper.executeAction(executeActionObject);
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
