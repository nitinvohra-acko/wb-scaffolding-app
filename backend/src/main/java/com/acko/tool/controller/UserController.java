package com.acko.tool.controller;

import java.security.Principal;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acko.tool.config.properties.KeycloakConfigProperties;
import com.acko.tool.dto.UserDTO;
import com.acko.tool.entity.User;
import com.acko.tool.entity.search.user.UserSearch;
import com.acko.tool.service.UserService;
import com.acko.tool.utils.JwtTokenUtil;

import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
	
	private final KeycloakConfigProperties keycloakConfigProperties;
	private final JwtTokenUtil jwtTokenUtil; 
	private final Keycloak adminKeycloak;
	private final UserService userService;
	
    @PostMapping
	public User createOrUpdateUser(@RequestBody @Valid UserDTO userRequest) {
        try {
        	return userService.createOrUpdateUser(userRequest);
        } catch (Exception e) {
            log.error("Exception occurred while creating/updating user", e);
            throw new RuntimeException(e);
        }
    }
    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
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
	
	@GetMapping("/token/info")
	public Object getUserInfo(Principal principal, @RequestHeader("Authorization") String authHeader) {
		// Extract the token from the Authorization header (usually prefixed with "Bearer ")
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return "Missing or invalid token!";
		}
		
		String token = authHeader.substring(7); // Remove "Bearer " prefix
		
		try {
			// Extract Claims from the token
			Claims claims = jwtTokenUtil.extractClaims(token);
			String username = claims.getSubject();
			return claims;
		} catch (Exception e) {
			return "Invalid token or token expired";
		}
	}
	
	@PostMapping("/search")
	public UserSearch searchUsers(@RequestBody(required = true) UserSearch userSearch) throws Exception {
		return userService.searchUsers(userSearch);
	}
}
