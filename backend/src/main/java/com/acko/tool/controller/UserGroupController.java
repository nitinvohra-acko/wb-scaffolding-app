package com.acko.tool.controller;

import java.util.List;

import org.keycloak.representations.idm.GroupRepresentation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acko.tool.dto.UserGroupDTO;
import com.acko.tool.service.UserGroupService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/user/group")
@RequiredArgsConstructor
@Slf4j
public class UserGroupController {
	
	private final UserGroupService userGroupService;

	@GetMapping
	public List<GroupRepresentation> getAllGroups() {
		return userGroupService.getAllGroups();
	}
	
	@PostMapping
	public List<GroupRepresentation> createOrUpdateGroup(@RequestBody @Valid List<UserGroupDTO> groupRequest) {
		return userGroupService.createOrUpdatGroups(groupRequest);
	}
}
