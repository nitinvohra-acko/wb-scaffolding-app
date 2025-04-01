package com.acko.tool.service.action;

import com.acko.tool.entity.Event;
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

    public EventActionMetadata getMetadata(EventActionMetadata eventActionDTO)
        throws NoSuchFieldException {
        // TODO: Get list of events from somewhere.
        eventActionDTO.setEventsList(List.of(
            new EventLabelDTO("TASK_CREATED", "Task created"),
            new EventLabelDTO("TASK_STATUS_UPDATED", "Task Status Updated") // Example!
        ));

        eventActionDTO.setActionsList(new ArrayList<>());
        for (ActionMapper actionMapper : actionMappers) {
            eventActionDTO.getActionsList().add(actionMapper.getMetadata());
        }
        eventActionDTO.setEntityParams(new HashMap<>());

        // Loop over TaskType enums and get getCombinedSearchFields for each
        for (TaskType taskType : TaskType.values()) {
            eventActionDTO.getEntityParams().put(taskType.name(),searchService.getCombinedSearchFields(taskType.name()));
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

    public Event getActionsForEventAndExecute(Event event) {
        List<EventAction> actions = getActionsForEvent(event);
        if(!actions.isEmpty()){
            for (EventAction action : actions) {
                execute(action, event);
            }
        }
        return event;
    }

    private List<EventAction> getActionsForEvent(Event event) {
        List<EventAction> actions = actionRepository.getActionByEventId(event.getEventId(), true);
        if(Objects.isNull(actions) || actions.isEmpty()) {
            return new ArrayList<>();
        } else {
            return actions;
        }
    }

    private ExecuteActionDTO execute(EventAction action, Event event) {
        ActionMapper actionMapper = getActionMapper(action.getAction());
        if (action == null) {
            throw new ResourceNotFoundException("Invalid action type: " + action.getAction());
        }
        ExecuteActionDTO executeActionObject = ExecuteActionDTO.builder().action(action).referenceTaskId(event.getReferenceTaskId()).build();
//        return actionMapper.executeAction(executeActionObject);
        // TODO: Complete this
        return executeActionObject;
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
