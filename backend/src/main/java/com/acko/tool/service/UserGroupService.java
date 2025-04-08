package com.acko.tool.service;

import java.util.List;

import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.stereotype.Service;

import com.acko.tool.dto.UserGroupDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class UserGroupService {

	private final KeycloakService keycloakService;
	
	public List<GroupRepresentation> createOrUpdatGroups(@Valid List<UserGroupDTO> groupsRequest) {
		return keycloakService.createOrUpdateGroups(groupsRequest);
	}

	public List<GroupRepresentation> getAllGroups() {
		return keycloakService.getAllGroups();
	}

}
