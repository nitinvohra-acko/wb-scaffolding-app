package com.acko.tool.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KeycloakService {

	private final Keycloak adminKeycloak;

    public void createUser(String username, String firstName, String lastName, String email, String password) {
        // Create a new user object
        UserRepresentation user = new UserRepresentation();
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setEnabled(true);
        
     // Create the user credential (password)
        CredentialRepresentation passwordCredential = new CredentialRepresentation();
        passwordCredential.setType(CredentialRepresentation.PASSWORD);
        passwordCredential.setValue(password);
        passwordCredential.setTemporary(false); 
        
        user.setCredentials(Collections.singletonList(passwordCredential));

        // Create the user in the Keycloak system
        adminKeycloak.realm("master").users().create(user);
    }
    
    public UserRepresentation getUserById(String userId) {

        // Fetch the user by ID
        UserResource userResource = adminKeycloak.realm("master").users().get(userId);
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
}