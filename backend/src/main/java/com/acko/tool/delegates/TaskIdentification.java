package com.acko.tool.delegates;

import com.acko.tool.service.RuleEngineService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Log4j2
@AllArgsConstructor
public class TaskIdentification implements JavaDelegate {

    private RuleEngineService ruleEngineService;

    @Override
    public void execute(DelegateExecution delegateExecution){
        Object request = delegateExecution.getVariable("request");
        String type = ((HashMap<?, ?>)request).get("type").toString();
        Map<String,Object> requestForTaskIdentification = new HashMap<>();
        requestForTaskIdentification.put("task",type);
        Object outputDelegate = ruleEngineService.execute("task_identification",requestForTaskIdentification);
        delegateExecution.setVariable("delegate",outputDelegate);
    }
}
