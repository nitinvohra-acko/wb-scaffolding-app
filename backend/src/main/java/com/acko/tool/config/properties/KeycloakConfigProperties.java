package com.acko.tool.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "keycloak")
public class KeycloakConfigProperties {
	private String serverUrl;
	private String realm;
	private String clientId;
	private String adminUserName;
	private String adminPassword;
}
