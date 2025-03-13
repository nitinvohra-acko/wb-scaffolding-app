package com.acko.tool.controller;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RealmRepresentation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/realm")
@RequiredArgsConstructor
public class KeycloakController {
	
	private final Keycloak adminKeycloak;

	@PostMapping
	public void createRealm(@RequestParam String realmName, @RequestParam String realmDisplayName) {
		RealmRepresentation newRealm = new RealmRepresentation();
		newRealm.setEnabled(true);
		newRealm.setRealm(realmName);
		newRealm.setDisplayName(realmDisplayName);

		adminKeycloak.realms().create(newRealm);

//		RealmRepresentation realmRepresentation = adminKeycloak.realms().realm(realmName).toRepresentation();
//		return realmRepresentation;
	}
	
//	@GetMapping
//	public RealmRepresentation getRealm(@RequestParam String realmName) {
//
//		RealmRepresentation realmRepresentation = adminKeycloak.realm(realmName).toRepresentation();
//		return realmRepresentation;
//	}
	
}
