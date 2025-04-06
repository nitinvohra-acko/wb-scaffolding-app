package com.acko.tool.service;

import java.util.List;

import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.stereotype.Service;

import com.acko.tool.dto.UserRoleDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class UserRoleService {

	private final KeycloakService keycloakService;
	
	public RoleRepresentation getRoleByName(String roleName) {
		return keycloakService.getRoleByName(roleName);
	}

	public List<RoleRepresentation> createOrUpdateRoles(@Valid List<UserRoleDTO> rolesRequest) {
		return keycloakService.createOrUpdateRoles(rolesRequest);
	}

	public List<RoleRepresentation> getAllRoles() {
		return keycloakService.getAllRoles();
	}


}
