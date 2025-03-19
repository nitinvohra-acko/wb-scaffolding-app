package com.acko.tool.delegates;

import com.acko.tool.utils.TaskPropagatorUtils;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Log4j2
@Component
@AllArgsConstructor
public class CompleteTelemer implements JavaDelegate {

    private final TaskPropagatorUtils taskPropagatorUtils;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("Completed Telemer for this case");
        delegateExecution.setVariable("task_status", "telemer_completed");
        delegateExecution.setVariable("changes","Telemer Completed");
        taskPropagatorUtils.taskPropagatorFunction(delegateExecution);
    }
}
