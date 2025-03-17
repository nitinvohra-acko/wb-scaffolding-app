package com.acko.tool.service.action;

import com.acko.tool.entity.action.Action;
import com.acko.tool.entity.action.ActionMetadataDTO;
import com.acko.tool.entity.action.AssignTaskMetadataDTO;
import com.acko.tool.entity.action.AssignToDTO;
import com.acko.tool.entity.action.AssignmentStrategyDTO;
import com.acko.tool.entity.action.EventActionMetadata;
import com.acko.tool.entity.action.UserLabelDTO;
import com.acko.tool.repository.ActionRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@AllArgsConstructor
public class AssignTaskService implements ActionMapper {
    private final ActionRepository actionRepository;

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
}
