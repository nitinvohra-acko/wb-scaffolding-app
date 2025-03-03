package com.acko.tool.clients;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value = "rap-manager-service", url = "${acko.rap-manager-service.url}")
public interface RapManagerClient {

	@PutMapping(path = "{proposal_id}/postPayment/member/update", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	Object updatePostPaymentMemberDetailsToProposal(@PathVariable("proposal_id") String proposalId, @RequestBody Object request);

}
