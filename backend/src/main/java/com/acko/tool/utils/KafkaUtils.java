package com.acko.tool.utils;

import com.acko.tool.model.KafkaMessage;
import com.acko.tool.service.KafkaProducerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class KafkaUtils {

    private final KafkaProducerService kafkaProducerService;

    public void sendMessage(KafkaMessage message, String key) {
        kafkaProducerService.sendMessage(message, key);
    }

}
