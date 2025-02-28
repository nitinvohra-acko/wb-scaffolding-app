package com.acko.tool.controller;

import com.acko.commons.commons.sureos_proposal.ProposalOutput;
import com.acko.health.commons.proposal.dto.request.ProposalRequest;
import com.acko.tool.service.WorkflowService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/workflow")
@AllArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @PutMapping(path = "{proposal_id}/postPayment/member/update", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String updatePostPaymentMemberDetailsToProposal(@PathVariable("proposal_id") String proposalId, @RequestBody ProposalRequest request) {
        return workflowService.updatePostPaymentMemberDetailsToProposal(proposalId, request);
    }
}
