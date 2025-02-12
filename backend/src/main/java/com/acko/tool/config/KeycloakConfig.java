package com.acko.tool.config;

import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfig {

//	final static String serverUrl = "http://localhost:8080";
	public final static String realm = "master";
	final static String clientId = "admin-cli";
	final static String userName = "admin";
	final static String password = "admin"; ////////////////////////TODO
	
	@Value("${keycloak.serverUrl}")
	private String serverUrl;

	@Bean
	public Keycloak keycloak() {

		return KeycloakBuilder.builder()
				.serverUrl(serverUrl)
				.realm(realm)
				.grantType(OAuth2Constants.PASSWORD)
				.username(userName)
				.password(password)
				.clientId(clientId)
//              .clientSecret(clientSecret)
				.resteasyClient(new ResteasyClientBuilderImpl()
						.connectionPoolSize(10)
						.build())
				.build();

//            List<UserRepresentation> users = keycloak.realm(realm)
//            	      .users()
//            	      .searchByUsername("admin", true);
//            System.out.println(users);

	}
}
