package com.acko.tool.service;

import com.acko.tool.model.KafkaMessage;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            payload.put("eventid", kafkaMessage.getEventType());
            Object response = ruleEngineService.execute("MainEvent", payload);
            Map<String, Object> responseMap = objectMapper.convertValue( ((List<?>) response).get(0), new TypeReference<Map<String, Object>>() {});
            ruleEngineService.startBpmnProcess(responseMap.get("action").toString(), kafkaMessage.getPayload());
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
            payload.put("eventid", kafkaMessage.getEventType());
            Object response = ruleEngineService.execute("MainEvent", payload);
            Map<String, Object> responseMap = objectMapper.convertValue( ((List<?>) response).get(0), new TypeReference<Map<String, Object>>() {});
            //ruleEngineService.startBpmnProcess(responseMap.get("action").toString(), kafkaMessage.getPayload());
            if(responseMap.get("isBPMN").equals("false")){
                workflowService.sendEventToWorkflow("StartTelemerWorkflow",kafkaMessage.getEventType(), kafkaMessage.getPayload());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}