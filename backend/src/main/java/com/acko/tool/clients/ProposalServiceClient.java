package com.acko.tool.clients;

import com.acko.commons.commons.sureos_proposal.ProposalOutput;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "proposal-service", url = "${acko.proposal-service.url}")
public interface ProposalServiceClient {

	@GetMapping(value = "/acko/v1/proposal/{proposal_id}", produces = MediaType.APPLICATION_JSON_VALUE)
	ProposalOutput getProposal(@PathVariable("proposal_id") String proposalId, @RequestHeader("directory-location") String directoryLocation);

	@PutMapping(value = "/acko/v1/proposal/{proposal_id}", produces = MediaType.APPLICATION_JSON_VALUE)
	ProposalOutput updateProposal(@PathVariable("proposal_id") final String proposalId, @RequestBody final ProposalOutput proposalOutput, @RequestHeader(value = "directory-location") final String directoryLocation);
}
