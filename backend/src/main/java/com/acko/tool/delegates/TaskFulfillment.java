package com.acko.tool.delegates;

import com.acko.tool.clients.RapManagerClient;
import com.acko.tool.service.RuleEngineService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@AllArgsConstructor
public class TaskFulfillment implements JavaDelegate {

    private final RapManagerClient rapManagerClient;

    private final RuleEngineService ruleEngineService;

    @Override
    public void execute(DelegateExecution delegateExecution){
        String taskDelegate = delegateExecution.getVariable("delegate").toString();
        switch (taskDelegate) {
            case "UpdateHeightWeight":
                ruleEngineService.startBpmnProcess("UpdateHeightWeightProcess", delegateExecution.getVariables());
                break;
            case "CompleteTelemer":
                delegateExecution.setVariable("status", "done");
                ruleEngineService.startBpmnProcess("StartTelemerWorkflow",delegateExecution.getVariables());
                //run telemer process
        }
    }
}
