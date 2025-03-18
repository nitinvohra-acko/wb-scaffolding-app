package com.acko.tool.delegates;

import com.acko.tool.service.RuleEngineService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.dmn.engine.impl.DmnDecisionResultImpl;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
@Log4j2
@AllArgsConstructor
public class TaskIdentification implements JavaDelegate {

    private RuleEngineService ruleEngineService;

    @Override
    public void execute(DelegateExecution delegateExecution){
        Object task = delegateExecution.getVariable("type");
        String type = task.toString();
        Map<String,Object> requestForTaskIdentification = new HashMap<>();
        requestForTaskIdentification.put("task",type);
        Object outputDelegate = ruleEngineService.execute("task_identification",requestForTaskIdentification);
        if (Objects.isNull(outputDelegate)) throw new RuntimeException("No Delegate found for given task "+ type);
        Object taskDelegate = ((DmnDecisionResultImpl) outputDelegate).getFirstResult().get("delegate");
        delegateExecution.setVariable("delegate",taskDelegate);
    }
}
