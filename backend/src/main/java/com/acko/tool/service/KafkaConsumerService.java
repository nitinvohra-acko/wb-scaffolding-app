package com.acko.tool.service;

import com.acko.tool.entity.Task;
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
import java.util.Objects;

@Slf4j
@Service
public class KafkaConsumerService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    RuleEngineService ruleEngineService;

    @Autowired
    WorkflowService workflowService;

    @Autowired
    TasksService tasksService;


    @KafkaListener(topics = "wb-scaffolding", groupId = "my-group-1")
    public void consumeMainWorkflowEvent(String message) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);
            KafkaMessage kafkaMessage = objectMapper.treeToValue(jsonNode, KafkaMessage.class);
            log.info("Inside external kafka consumer " + kafkaMessage.getEventId());
            Map<String, Object> payload = new HashMap<>();
            payload.put("event_id", kafkaMessage.getEventType());
            Object response = ruleEngineService.execute("MainToolEventDecision", payload);
            if (Objects.nonNull(response) && response instanceof List && !((List<?>) response).isEmpty()) {
                Map<String, Object> responseMap = objectMapper.convertValue(((List<?>) response).get(0), new TypeReference<Map<String, Object>>() {
                });
                if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn")) {
                    ruleEngineService.startBpmnProcess(responseMap.get("workflow_name").toString(), kafkaMessage.getPayload());
                } else if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn_event")) {
                    if (Objects.nonNull(kafkaMessage.getPayload().get("task_id"))) {
                        String taskId = kafkaMessage.getPayload().get("task_id").toString();
                        Task<?> task = tasksService.fetchTaskById(taskId);
                        String workflowId = task.getWorkflowInstanceId();
                        kafkaMessage.getPayload().put("workflow_id", workflowId);
                    }
                    workflowService.sendEventToWorkflow(responseMap.get("workflow_name").toString(), responseMap.get("event_name").toString(), kafkaMessage.getPayload());
                } else log.info("No action taken");
            }else log.info("No action taken");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = "wb-scaffolding", groupId = "my-group")
    public void consumeUWToolEvent(String message) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);
            KafkaMessage kafkaMessage = objectMapper.treeToValue(jsonNode, KafkaMessage.class);
            Map<String, Object> payload = new HashMap<>();
            log.info("Inside internal kafka consumer " + kafkaMessage.getEventId());
            payload.put("event_id", kafkaMessage.getEventType());
            Object response = ruleEngineService.execute("UWToolWorkbenchToolEventDecision", payload);
            if (Objects.nonNull(response) && response instanceof List && !((List<?>) response).isEmpty()) {
                Map<String, Object> responseMap = objectMapper.convertValue(((List<?>) response).get(0), new TypeReference<Map<String, Object>>() {
                });
                if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn")) {
                    ruleEngineService.startBpmnProcess(responseMap.get("workflow_name").toString(), kafkaMessage.getPayload());
                } else if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn_event")) {
                    workflowService.sendEventToWorkflow(responseMap.get("workflow_name").toString(), responseMap.get("event_name").toString(), kafkaMessage.getPayload());
                } else log.info("No action taken");
            }else log.info("No action taken");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = "wb-scaffolding", groupId = "my-group-2")
    public void consumeCRMToolEvent(String message) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);
            KafkaMessage kafkaMessage = objectMapper.treeToValue(jsonNode, KafkaMessage.class);
            Map<String, Object> payload = new HashMap<>();
            log.info("Inside internal kafka consumer " + kafkaMessage.getEventId());
            payload.put("event_id", kafkaMessage.getEventType());
            Object response = ruleEngineService.execute("CRMToolEventDecision", payload);
            if (Objects.nonNull(response) && response instanceof List && !((List<?>) response).isEmpty()) {
                Map<String, Object> responseMap = objectMapper.convertValue(((List<?>) response).get(0), new TypeReference<Map<String, Object>>() {
                });
                if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn")) {
                    ruleEngineService.startBpmnProcess(responseMap.get("workflow_name").toString(), kafkaMessage.getPayload());
                } else if (responseMap.get("action_type").toString().equalsIgnoreCase("bpmn_event")) {
                    workflowService.sendEventToWorkflow(responseMap.get("workflow_name").toString(), responseMap.get("event_name").toString(), kafkaMessage.getPayload());
                } else log.info("No action taken");
            }else log.info("No action taken");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}