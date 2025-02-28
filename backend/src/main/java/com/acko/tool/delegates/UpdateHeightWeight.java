package com.acko.tool.delegates;

import com.acko.commons.commons.sureos_proposal.ParameterDTO;
import com.acko.commons.commons.sureos_proposal.ProposalInsured;
import com.acko.commons.commons.sureos_proposal.ProposalOutput;
import com.acko.commons.commons.sureos_proposal.enums.ProposalStatus;
import com.acko.health.commons.proposal.dto.ProposalUser;
import com.acko.health.commons.proposal.dto.request.ProposalRequest;
import com.acko.tool.clients.ProposalServiceClient;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Log4j2
@AllArgsConstructor
public class UpdateHeightWeight implements JavaDelegate {

    @Value("${directory-location}")
    private String directoryLocation;

    private final ProposalServiceClient proposalServiceClient;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        String proposalId = delegateExecution.getVariable("proposalId").toString();
        ProposalRequest request = (ProposalRequest) delegateExecution.getVariable("request");
        ProposalOutput proposalOutput = proposalServiceClient.getProposal(proposalId, directoryLocation);

        String proposalStatus = proposalOutput.getHeader().getStatus();

        if (!ProposalStatus.PAYMENT_SUCCESSFUL.toString().equalsIgnoreCase(proposalStatus)) {
            throw new RuntimeException(String.format("Cannot update a proposal which is not in payment successful & customer action pending state %s", proposalId));
        }

        List<ProposalInsured> proposalInsuredList = proposalOutput.getInsured();
        Map<String, ProposalUser> userMap = request.getUsers().stream()
                .collect(Collectors.toMap(ProposalUser::getMemberUniqueId, user -> user));

        for (ProposalInsured proposalInsured : proposalInsuredList) {
            ProposalUser updatedProposalInsured = userMap.get(proposalInsured.getInsuredId());
            if (updatedProposalInsured != null) {
                validateUserDetails(updatedProposalInsured);
                updateParameter(proposalInsured, "height", updatedProposalInsured.getHeight());
                updateParameter(proposalInsured, "weight", updatedProposalInsured.getWeight());
            }
        }
        proposalServiceClient.updateProposal(proposalId, proposalOutput, directoryLocation);
    }


    private void validateUserDetails(ProposalUser user) {
        if (user.getHeight() != null && user.getHeight() <= 0) {
            throw new IllegalArgumentException("insured.height should be a positive integer");
        }
        if (user.getWeight() != null && user.getWeight() <= 0) {
            throw new IllegalArgumentException("insured.weight should be a positive integer");
        }
    }

    private void updateParameter(ProposalInsured proposalInsured, String parameterId, Integer value) {
        if (value != null) {
            Map<String, ParameterDTO> parameters = proposalInsured.getParameters();
            parameters.compute(parameterId, (key, parameter) -> {
                if (parameter == null) {
                    return ParameterDTO.builder().id(parameterId).value(value).build();
                } else {
                    parameter.setValue(value);
                    return parameter;
                }
            });
        }
    }
}
