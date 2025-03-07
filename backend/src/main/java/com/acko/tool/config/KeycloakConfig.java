package com.acko.tool.config;

import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.acko.tool.config.properties.KeycloakConfigProperties;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class KeycloakConfig {

	private final KeycloakConfigProperties keycloakConfigProperties;
	
	@Bean
	public Keycloak adminKeycloak() {
		Keycloak keycloak = KeycloakBuilder.builder()
				.serverUrl(keycloakConfigProperties.getServerUrl())
				.realm(keycloakConfigProperties.getRealm())
				.grantType(OAuth2Constants.PASSWORD)
				.username(keycloakConfigProperties.getAdminUserName())
				.password(keycloakConfigProperties.getAdminPassword())
				.clientId(keycloakConfigProperties.getClientId())
				.resteasyClient(new ResteasyClientBuilderImpl()
						.connectionPoolSize(10)
						.build())
				.build();
        return keycloak;
	}
}
