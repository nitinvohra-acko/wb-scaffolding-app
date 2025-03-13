package com.acko.tool.service;

import com.acko.tool.dtos.WorkflowRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Objects;

@Service
@Log4j2
@RequiredArgsConstructor
public class WorkflowService {

    @Autowired
    private RuntimeService runtimeService;

    public static final String INITIATE_WORKFLOW_DEFINITION_KEY = "InitiateWorkflow";

    public String initiateWorkflow(String taskId, WorkflowRequest request) {
        if (Objects.isNull(request.getReferenceId())) {
            throw new RuntimeException("Reference ID cannot be null");
        }
        ProcessInstance scheduleProcessInstance = runtimeService.createProcessInstanceQuery()
                .superProcessInstanceId(taskId)
                .processDefinitionKey(INITIATE_WORKFLOW_DEFINITION_KEY)
                .singleResult();

        log.debug("Proposal ID: {}, Schedule Process ID: {}", request.getReferenceId(), scheduleProcessInstance.getId());

        runtimeService.createMessageCorrelation("UpdateHeightWeightApiCallMessage")
                .setVariable("proposalId", request.getReferenceId())
                .setVariable("request", request)
                .processInstanceId(scheduleProcessInstance.getId())
                .correlate();

        log.info("Message fired to process instance {} to schedule assessment. Proposal ID: {}", scheduleProcessInstance.getId(), request.getReferenceId());
        return "success";
    }
}
