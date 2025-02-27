package com.acko.tool.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acko.tool.config.properties.KeycloakConfigProperties;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	
	private final KeycloakConfigProperties keycloakConfigProperties;
	private final Keycloak adminKeycloak;
	
	@GetMapping("/info")
	public Map<String, Object> getUserInfo(Principal principal) {
		return ((Jwt)((JwtAuthenticationToken)principal).getPrincipal()).getClaims();
	}
	
	@PostMapping(path = "/generate/token", consumes = "application/x-www-form-urlencoded")
	public AccessTokenResponse generateUserToken(@RequestBody MultiValueMap<String, String> formData) {
		Keycloak keycloak =  KeycloakBuilder.builder()
				.serverUrl(keycloakConfigProperties.getServerUrl())
				.realm(keycloakConfigProperties.getRealm())
				.grantType(OAuth2Constants.PASSWORD)
				.username(formData.getFirst("username"))
				.password(formData.getFirst("password"))
				.clientId(keycloakConfigProperties.getClientId())
				.build();
		
		return keycloak.tokenManager().grantToken();
	}
	
	@GetMapping(path = "/user-name")
	public UserRepresentation getUserByName(@RequestParam String username) {
		UsersResource usersResource = adminKeycloak.realm(keycloakConfigProperties.getRealm()).users();
		List<UserRepresentation> users = usersResource.searchByUsername(username, true);
		if (CollectionUtils.isNotEmpty(users)) {
			return users.get(0);
		}
		return null;
	}
	
	@GetMapping(path = "/user-id")
	public UserRepresentation getUserById(@RequestParam String userid) {
		UsersResource usersResource = adminKeycloak.realm(keycloakConfigProperties.getRealm()).users();
		UserResource userResource = usersResource.get(userid);
		if (userResource !=null) {
			return userResource.toRepresentation();
		}
		return null;
	}
}
