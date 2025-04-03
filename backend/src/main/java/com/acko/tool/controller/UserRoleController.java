package com.acko.tool.controller;

import java.util.List;

import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acko.tool.dto.UserRoleDTO;
import com.acko.tool.service.UserRoleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/user/role")
@RequiredArgsConstructor
@Slf4j
public class UserRoleController {
	
	private final UserRoleService userRoleService;

	@GetMapping("/{name}")
    public RoleRepresentation getRoleByName(@PathVariable("name") String roleName) {
        return userRoleService.getRoleByName(roleName);
    }
	
	@GetMapping
	public List<RoleRepresentation> getAllRoles() {
		return userRoleService.getAllRoles();
	}
	
	@PostMapping
	public List<RoleRepresentation> createOrUpdateRole(@RequestBody @Valid List<UserRoleDTO> rolesRequest) {
		return userRoleService.createOrUpdateRoles(rolesRequest);
	}
}
