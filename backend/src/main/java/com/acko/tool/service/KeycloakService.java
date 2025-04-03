package com.acko.tool.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import com.acko.tool.dto.UserDTO;
import com.acko.tool.dto.UserRoleDTO;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class KeycloakService {

	private final RealmResource adminRealmResource;

    public UserRepresentation createUser(UserDTO userRequest) {
        // Create a new user object
        UserRepresentation keycloakUser = new UserRepresentation();
        keycloakUser.setUsername(userRequest.getUsername());
        keycloakUser.setFirstName(userRequest.getFirstName());
        keycloakUser.setLastName(userRequest.getLastName());
        keycloakUser.setEmail(userRequest.getEmail());
        keycloakUser.setGroups(Collections.singletonList(userRequest.getGroup()));
        keycloakUser.setRealmRoles(userRequest.getRoles()); // TODO - check this, assign Realm level role
        keycloakUser.setEnabled(userRequest.isActive());
        
        // Create the user credential (password)
        CredentialRepresentation passwordCredential = new CredentialRepresentation();
        passwordCredential.setType(CredentialRepresentation.PASSWORD);
        passwordCredential.setValue(userRequest.getPassword());
        passwordCredential.setTemporary(false);
        
        keycloakUser.setCredentials(Collections.singletonList(passwordCredential));

        // Create the user in the Keycloak system
        Response response = adminRealmResource.users().create(keycloakUser);
        
        if (response.getStatus() >= 400 && response.getStatus() <= 599) {
        	log.error(response.readEntity(String.class));
        	throw new RuntimeException("Exception occurred while creating user in keycloak");
        }
		return getUserByUsername(userRequest.getUsername());
    }
    
	public UserRepresentation updateUser(String userId, UserDTO userRequest) {
		UserRepresentation keycloakUser = adminRealmResource.users().get(userId).toRepresentation();
		if (keycloakUser == null) {
			throw new RuntimeException("User does not exist in keycloak");
		}
		keycloakUser.setUsername(userRequest.getUsername());
		keycloakUser.setFirstName(userRequest.getFirstName());
		keycloakUser.setLastName(userRequest.getLastName());
		keycloakUser.setEmail(userRequest.getEmail());
		keycloakUser.setGroups(Collections.singletonList(userRequest.getGroup()));
		keycloakUser.setRealmRoles(userRequest.getRoles());
		keycloakUser.setEnabled(userRequest.isActive());

		if (userRequest.getPassword() != null) {
			CredentialRepresentation passwordCredential = new CredentialRepresentation();
			passwordCredential.setType(CredentialRepresentation.PASSWORD);
			passwordCredential.setValue(userRequest.getPassword());
			passwordCredential.setTemporary(false);
		}

		adminRealmResource.users().get(userId).update(keycloakUser);

		return keycloakUser;
	}
    
    public UserRepresentation getUserById(String userId) {
        // Fetch the user by ID
        UserResource userResource = adminRealmResource.users().get(userId);
        UserRepresentation user = userResource.toRepresentation();
        
        // Fetch user roles (realm roles)
        List<RoleRepresentation> realmRoles = userResource.roles().realmLevel().listAll();
        List<String> realmRoleNames = realmRoles.stream()
                .map(RoleRepresentation::getName)
                .collect(Collectors.toList());
        user.setRealmRoles(realmRoleNames);

        // Fetch user client roles (if needed, for example client roles for a specific client)
         List<RoleRepresentation> clientRoles = userResource.roles().clientLevel("39de56a1-a645-42a0-8a7a-f2b769785479").listAll();
//         Map<String, List<String>> clientRolesMap = clientRoles.stream()
//                 .map(RoleRepresentation::getName)
//                 .collect(Collectors.groupingBy(role -> clientId));
//          user.setClientRoles(clientRolesMap);

        return user;
    }
    
	public UserRepresentation getUserByUsername(String username) {
		List<UserRepresentation> userRepresentation = adminRealmResource.users().search(username, 0, 1);
		if (CollectionUtils.isNotEmpty(userRepresentation)) {
			return userRepresentation.get(0);
		}
		return null;
	}

	public RoleRepresentation getRoleByName(String roleName) {
		RoleRepresentation roleByName = null;
		try {
			RolesResource rolesResource = adminRealmResource.roles();
			roleByName = rolesResource.get(roleName).toRepresentation();

		} catch (Exception e) {
			log.error("", e);
		}
		return roleByName;
	}

	public List<RoleRepresentation> createOrUpdateRoles(List<UserRoleDTO> rolesRequest) {
		RolesResource rolesResource = adminRealmResource.roles();
		
		List<RoleRepresentation> roleRepresentationList = new ArrayList<>();
		
		
		for (UserRoleDTO roleRequest : rolesRequest) {
			RoleRepresentation role = getRoleByName(roleRequest.getRoleName());
			
			if (role == null) {
				// create
				role = new RoleRepresentation();
				role.setName(roleRequest.getRoleName());
				
				// Set role description (optional)
				role.setDescription("This is a custom role with attributes");
				
				// Set attributes for the role
				Map<String, List<String>> attributes = new HashMap<>();
				attributes.put("permissions", roleRequest.getPermissions());
				role.setAttributes(attributes);
				
				rolesResource.create(role);
				
				// again fetching to get updated copy from keycloak
				role = getRoleByName(roleRequest.getRoleName());
			} else {
				// update
				Map<String, List<String>> attributes = new HashMap<>();
				attributes.put("permissions", roleRequest.getPermissions());
				role.setAttributes(attributes);
				
				rolesResource.get(roleRequest.getRoleName()).update(role);
			}
			roleRepresentationList.add(role);
		}

		return roleRepresentationList;
	}

	public List<RoleRepresentation> getAllRoles() {
		RolesResource rolesResource = adminRealmResource.roles();
		List<RoleRepresentation> roles = new ArrayList<>();

		for (RoleRepresentation role : rolesResource.list()) {
			roles.add(getRoleByName(role.getName()));
		}
		return roles;
	}
	
}