package com.acko.tool.service;

import com.acko.health.commons.proposal.dto.request.ProposalRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class WorkflowService {

    @Autowired
    private RuntimeService runtimeService;

    public static final String SCHEDULE_ASSESSMENT_PROCESS_KEY = "UpdateHeightWeightProcess";

    public String updatePostPaymentMemberDetailsToProposal(String proposalId, ProposalRequest request) {
        ProcessInstance scheduleProcessInstance = runtimeService.createProcessInstanceQuery()
                .superProcessInstanceId(proposalId)
                .processDefinitionKey(SCHEDULE_ASSESSMENT_PROCESS_KEY)
                .singleResult();

        log.debug("Proposal ID: {}, Schedule Process ID: {}", proposalId, scheduleProcessInstance.getId());

        runtimeService.createMessageCorrelation("UpdateHeightWeightApiCallMessage")
                .setVariable("proposalId", proposalId)
                .setVariable("request", request)
                .processInstanceId(scheduleProcessInstance.getId())
                .correlate();

        log.info("Message fired to process instance {} to schedule assessment. Proposal ID: {}", scheduleProcessInstance.getId(), proposalId);
        return "success";
    }
}
