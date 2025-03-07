package com.acko.tool.controller;

import java.security.Principal;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.UserRepresentation;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
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
import com.acko.tool.service.KeycloakService;
import com.acko.tool.utils.JwtTokenUtil;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	
	private final KeycloakConfigProperties keycloakConfigProperties;
	private final KeycloakService keycloakService;
	private final JwtTokenUtil jwtTokenUtil; 
	private final Keycloak adminKeycloak;
	
	@GetMapping("/info")
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
	
	

    @PostMapping("/create")
    public String createUser(@RequestParam String username,
                             @RequestParam String firstName,
                             @RequestParam String lastName,
                             @RequestParam String email,
                             @RequestParam String password) {
        try {
            keycloakService.createUser(username, firstName, lastName, email, password);
            return "User created successfully!";
        } catch (Exception e) {
            return "Error creating user: " + e.getMessage();
        }
    }
    
    @GetMapping("/{userId}")
    public UserRepresentation getUserById(@PathVariable String userId) {
        return keycloakService.getUserById(userId);
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
	
}
