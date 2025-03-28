package com.acko.tool.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "spring.data.mongodb")
public class MongoDBProperties {
    private String uri;
    private String port;
    private String database;
}