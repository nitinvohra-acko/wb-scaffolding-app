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
import org.jeasy.rules.api.Facts;
import org.jeasy.rules.api.Rule;
import org.jeasy.rules.api.Rules;
import org.jeasy.rules.core.DefaultRulesEngine;
import org.jeasy.rules.mvel.MVELCondition;
import org.jeasy.rules.core.RuleBuilder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@AllArgsConstructor
public class AssignTaskService implements ActionMapper {
    private final ActionRepository actionRepository;
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

        // Evaluate the condition string using EasyRules with MVEL
        EventAction eventAction = executeActionObject.getAction();
        String condition = eventAction.getCondition(); // Assuming `getCondition()` returns the condition string
        if (condition != null && !condition.isEmpty()) {
            Facts facts = new Facts();
            facts.put("event", executeActionObject.getEvent()); // Add the event object to facts

            Rule rule = new RuleBuilder()
                .name("Condition Evaluation Rule")
                .description("Rule to evaluate the condition string using MVEL")
                .when(new MVELCondition(condition)) // Use MVELCondition to evaluate the condition
                .then(fact -> log.info("Condition evaluated to true"))
                .build();

            DefaultRulesEngine rulesEngine = new DefaultRulesEngine();
            Rules rules = new Rules();
            rules.register(rules);
            rulesEngine.fire(rules, facts);

            // If the condition is not satisfied, throw an exception
            if (!rule.evaluate(facts)) {
                log.info("Condition not satisfied -> " + condition);
                return executeActionObject;
            }
        }
        return executeActionObject;
    }
}
