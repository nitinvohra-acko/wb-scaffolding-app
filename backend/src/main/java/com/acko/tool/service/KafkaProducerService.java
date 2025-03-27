package com.acko.tool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private static final String TOPIC = "wb-scaffolding";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String message, String key) {
        kafkaTemplate.send(TOPIC, key ,message);
    }

    public void sendMessage(String message, String key, String topic) {
        kafkaTemplate.send(topic, key, message);
    }
}