package com.acko.tool.delegates;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@AllArgsConstructor
public class EventEmitDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution delegateExecution) {
        // push event to Kafka for update on task
        log.info("Pushed event to Kafka for task "+ delegateExecution.getVariable("task_id"));
    }
}
