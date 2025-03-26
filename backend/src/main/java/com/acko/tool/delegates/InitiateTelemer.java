package com.acko.tool.delegates;

import com.acko.tool.entity.Task;
import com.acko.tool.model.KafkaMessage;
import com.acko.tool.service.KafkaProducerService;
import com.acko.tool.service.TasksService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Log4j2
@Component
@AllArgsConstructor
public class InitiateTelemer implements JavaDelegate {

    private final TasksService tasksService;
    private final ObjectMapper objectMapper;
    private final KafkaProducerService producerService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("telemer process initiated");
        String taskId = delegateExecution.getVariable("task_id").toString();
        Task<?> proposalTask = tasksService.fetchTaskById(taskId);
        proposalTask.setStatus("telemer_initiated");
        tasksService.createOrUpdateTasks((List.of(proposalTask)));
        delegateExecution.setVariable("reference_task",proposalTask);
        KafkaMessage kafkaMessage = KafkaMessage.builder().eventId(UUID.randomUUID().toString()).eventType("telemer_required").timestamp(System.currentTimeMillis()).serviceName("doc_tool").payload(delegateExecution.getVariables()).build();
        String jsonString = objectMapper.writeValueAsString(kafkaMessage);
        System.out.println(jsonString);
        producerService.sendMessage(jsonString , kafkaMessage.getEventType());
    }
}
