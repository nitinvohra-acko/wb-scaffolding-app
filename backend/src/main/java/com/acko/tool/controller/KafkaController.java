package com.acko.tool.controller;

import com.acko.tool.service.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kafka")
public class KafkaController {

    @Autowired
    private KafkaProducerService producerService;

    @PostMapping("/publish")
    public String publishMessage(@RequestBody String message, @RequestParam String key, @RequestParam String topic) {
        producerService.sendMessage(message , key , topic);
        return "Message published successfully";
    }
}