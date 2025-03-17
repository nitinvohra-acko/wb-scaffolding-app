package com.acko.tool.delegates;

import com.acko.tool.clients.RapManagerClient;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@AllArgsConstructor
public class TaskFulfillment implements JavaDelegate {

    private final RapManagerClient rapManagerClient;

    @Override
    public void execute(DelegateExecution delegateExecution){

        String proposalId = delegateExecution.getVariable("proposalId").toString();
        Object request = delegateExecution.getVariable("request");
        Object proposalOutput = rapManagerClient.updatePostPaymentMemberDetailsToProposal(proposalId, request);
        delegateExecution.setVariable("response",proposalOutput);
    }
}
