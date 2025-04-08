package com.acko.tool.delegates.CRM;

import com.acko.tool.model.KafkaMessage;
import com.acko.tool.service.KafkaProducerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Log4j2
@Component
@AllArgsConstructor
public class CRMTaskIdentification implements JavaDelegate {

    private final ObjectMapper objectMapper;

    private final KafkaProducerService producerService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        delegateExecution.setVariable("event",delegateExecution.getVariable("decision"));
        KafkaMessage kafkaMessage = KafkaMessage.builder().eventId(UUID.randomUUID().toString()).eventType("crm_escalation_task").timestamp(System.currentTimeMillis()).source("doc_tool").payload(delegateExecution.getVariables()).build();
        String jsonString = objectMapper.writeValueAsString(kafkaMessage);
        System.out.println(jsonString);
        producerService.sendMessage(kafkaMessage , kafkaMessage.getEventType());
    }
}
