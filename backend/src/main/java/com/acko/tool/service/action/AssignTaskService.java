package com.acko.tool.service.action;

import com.acko.tool.entity.Task;
import com.acko.tool.entity.action.Action;
import com.acko.tool.entity.action.ActionMetadataDTO;
import com.acko.tool.entity.action.AssignTaskMetadataDTO;
import com.acko.tool.entity.action.AssignTaskProperties;
import com.acko.tool.entity.action.AssignToDTO;
import com.acko.tool.entity.action.AssignmentStrategyDTO;
import com.acko.tool.entity.action.EventActionMetadata;
import com.acko.tool.entity.action.ExecuteActionDTO;
import com.acko.tool.entity.action.UserLabelDTO;
import com.acko.tool.exception.BadRequestException;
import com.acko.tool.exception.ResourceNotFoundException;
import com.acko.tool.repository.ActionRepository;
import com.acko.tool.service.TasksService;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@AllArgsConstructor
public class AssignTaskService implements ActionMapper {
    private final ActionRepository actionRepository;
    private final TasksService taskService;
    private final ActionValidator actionValidator;

    @Override
    public EventActionMetadata getMetadata(EventActionMetadata eventActionDTO) {
        // Get metadata
        ActionMetadataDTO metadata = ActionMetadataDTO.builder()
            .assignTaskMetadata(AssignTaskMetadataDTO.builder()
                // TODO: This can be as is or in constants
                .assignToList(List.of(
                    new AssignToDTO("ANY", "Any"),
                    new AssignToDTO("USER_WITH_PROPERTY", "User with property"),
                    new AssignToDTO("INDIVIDUAL_USER", "Individual User")
                ))
                // TODO: This will come from the users or rosters
                .userList(List.of(
                    new UserLabelDTO("1", "User 1"),
                    new UserLabelDTO("2", "User 2")
                ))
                // TODO: This can be as is or in constants.
                .assignmentStrategyList(List.of(
                    new AssignmentStrategyDTO("ROUND_ROBIN", "Round Robin"),
                    new AssignmentStrategyDTO("LEAST_BUSY", "Least Busy")
                ))
                // TODO: This can be as is or in constants.
                .userPropertyList(List.of("reproposal specialist", "topup specialist"))
                .build())
            .build();
        eventActionDTO.setMetadata(metadata);
        return eventActionDTO;
    }

    @Override
    public Action saveAction(Action saveActionDTO) {
        // Save action
        return actionRepository.save(saveActionDTO);
    }

    @Override
    public String getActionType() {
        return "ASSIGN_TASK";
    }

    @Override
    public ExecuteActionDTO executeAction(ExecuteActionDTO executeActionObject) throws Exception {
        actionValidator.validateExecuteActionObject(executeActionObject);
        actionValidator.validateActionProperties(executeActionObject);

        AssignTaskProperties actionProperties = executeActionObject.getAction().getActionProperties().getAssignTaskProperties();
        Task task = taskService.fetchTaskById(executeActionObject.getReferenceTaskId());

        if(Objects.isNull(task)) throw new ResourceNotFoundException("Now such task found -> " + executeActionObject.getReferenceTaskId());

        switch (actionProperties.getAssignTo()) {
            case "INDIVIDUAL_USER":
                task.setAssignee(actionProperties.getUserId());
                taskService.createOrUpdateTasks(List.of(task));
                break;
            case "USER_WITH_PROPERTY":

                break;
            default: throw new BadRequestException("No such assign to property found -> " + actionProperties.getAssignTo());
        }
        return executeActionObject;
    }
}
