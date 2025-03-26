package com.acko.tool.service;

import com.acko.tool.model.KafkaMessage;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class KafkaConsumerService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    RuleEngineService ruleEngineService;

    @Autowired
    WorkflowService workflowService;


    @KafkaListener(topics = "internal", groupId = "my-group")
    public void consumeInternal(String message) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);
            KafkaMessage kafkaMessage = objectMapper.treeToValue(jsonNode, KafkaMessage.class);
            Map<String, Object> payload = new HashMap<>();
            payload.put("event_id", kafkaMessage.getEventType());
            Object response = ruleEngineService.execute("InternalKafkaEventDecision", payload);
            Map<String, Object> responseMap = objectMapper.convertValue( ((List<?>) response).get(0), new TypeReference<Map<String, Object>>() {});
            if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn")){
                ruleEngineService.startBpmnProcess(responseMap.get("workflow_name").toString(), kafkaMessage.getPayload());
            } else if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn_event")){
                workflowService.sendEventToWorkflow(responseMap.get("workflow_name").toString(),responseMap.get("event_name").toString(), kafkaMessage.getPayload());
            }
            else log.info("No action taken");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = "external", groupId = "my-group")
    public void consumeExternal(String message) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);
            KafkaMessage kafkaMessage = objectMapper.treeToValue(jsonNode, KafkaMessage.class);
            Map<String, Object> payload = new HashMap<>();
            payload.put("event_id", kafkaMessage.getEventType());
            Object response = ruleEngineService.execute("ExternalKafkaEventDecision", payload);
            Map<String, Object> responseMap = objectMapper.convertValue( ((List<?>) response).get(0), new TypeReference<Map<String, Object>>() {});
            if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn")){
                ruleEngineService.startBpmnProcess(responseMap.get("workflow_name").toString(), kafkaMessage.getPayload());
            } else if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn_event")){
                workflowService.sendEventToWorkflow(responseMap.get("workflow_name").toString(),responseMap.get("event_name").toString(), kafkaMessage.getPayload());
            }
            else log.info("No action taken");
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
    }
}