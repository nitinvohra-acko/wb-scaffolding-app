package com.acko.tool.delegates;

import com.acko.tool.utils.TaskPropagatorUtils;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@AllArgsConstructor
public class RequestTelemerCallback implements JavaDelegate {

    private final TaskPropagatorUtils taskPropagatorUtils;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("User requested Telemer for this case");
        //todo: check delegate execution here and create task for telemer
        //todo: add task_status as telemer_callback_requested
        //todo: save process instance id in task
        delegateExecution.setVariable("task_status", "telemer_initiated");
        delegateExecution.setVariable("changes","Telemer Initiated");
       // taskPropagatorUtils.taskPropagatorFunction(delegateExecution);
    }
}
