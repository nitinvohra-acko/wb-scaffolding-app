package com.acko.tool.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ToolConfig {

    @Value("${acko.tool-name.name}")
    private String toolName;

    @Bean
    public String toolName() {
        return toolName;
    }
}