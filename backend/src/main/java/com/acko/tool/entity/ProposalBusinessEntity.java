package com.acko.tool.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class ProposalBusinessEntity {

	// this entity business/LOB has to define
	private String proposalId;
	private String proposalStatus;
	private List<String> memberIds;
	Object proposalUsers;
}
