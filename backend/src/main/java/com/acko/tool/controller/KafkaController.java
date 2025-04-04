package com.acko.tool.controller;

import com.acko.tool.model.KafkaMessage;
import com.acko.tool.service.KafkaProducerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/kafka")
public class KafkaController {

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private KafkaProducerService producerService;

    @PostMapping("/publish")
    public String publishMessage(@RequestBody String message, @RequestParam String key, @RequestParam String topic) throws JsonProcessingException {
        KafkaMessage kafkaMessage = objectMapper.readValue(message , KafkaMessage.class);
        producerService.sendMessage(kafkaMessage , key , topic);
        return "Message published successfully";
    }
}