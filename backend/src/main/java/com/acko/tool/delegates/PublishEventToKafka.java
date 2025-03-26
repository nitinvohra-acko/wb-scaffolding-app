package com.acko.tool.delegates;

import com.acko.tool.model.KafkaMessage;
import com.acko.tool.service.KafkaProducerService;
import com.acko.tool.utils.TaskPropagatorUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Log4j2
@Component
@AllArgsConstructor
public class PublishEventToKafka implements JavaDelegate {

//    @Value("acko.com")
//    String toolName;

    private final TaskPropagatorUtils taskPropagatorUtils;
    private final KafkaProducerService producerService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("UW scheduled Telemer Call");
        delegateExecution.setVariable("task_status", "telemer_scheduled");
        KafkaMessage kafkaMessage = KafkaMessage.builder().eventId(UUID.randomUUID().toString()).eventType("telemer_completed").timestamp(System.currentTimeMillis()).serviceName("doc_tool").payload(delegateExecution.getVariables()).build();
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(kafkaMessage);
        System.out.println(jsonString);
       producerService.sendMessage(jsonString , kafkaMessage.getEventType());
    }
}
