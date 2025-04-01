package com.acko.tool.service.action;

import com.acko.tool.entity.Task;
import com.acko.tool.entity.action.EventAction;
import com.acko.tool.entity.action.ActionMetadataDTO;
import com.acko.tool.entity.action.ActionPropertyDTO;
import com.acko.tool.entity.action.ExecuteActionDTO;
import com.acko.tool.entity.action.OptionLabelDTO;
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
    public ActionMetadataDTO getMetadata() {
        // Get metadata
        ActionMetadataDTO metadata = ActionMetadataDTO.builder()
            .id(getActionType())
            .name(getActionName())
            .properties(ActionPropertyDTO.builder()
                .type("multi-select")
                .build())
            .build();

        //TODO: Get distinct properties from DB
        metadata.getProperties().setOptions(
            List.of(
                OptionLabelDTO.builder()
                    .id("INDIVIDUAL_USER")
                    .name("Individual User")
                    .build(),
                OptionLabelDTO.builder()
                    .id("USER_WITH_PROPERTY")
                    .name("User with Property")
                    .build()
            )
        );
        return metadata;
    }

    @Override
    public EventAction saveAction(EventAction saveActionDTO) {
        // Save action
        return actionRepository.save(saveActionDTO);
    }

    @Override
    public String getActionType() {
        return "ASSIGN_TASK_ROUND_ROBIN_WITH_PROPERTY";
    }

    @Override
    public String getActionName() { return "Assign Task Round Robin with Property"; }

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
