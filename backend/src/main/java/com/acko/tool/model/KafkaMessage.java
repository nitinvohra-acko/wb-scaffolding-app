package com.acko.tool.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KafkaMessage {
    private String eventId;
    private String eventType;
    private long timestamp;
    private String serviceName;
    private Map<String, Object> payload;
}