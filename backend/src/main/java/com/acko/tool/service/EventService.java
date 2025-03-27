package com.acko.tool.service;

import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.acko.tool.dto.EventDTO;
import com.acko.tool.entity.search.event.ESEvent;
import com.acko.tool.utils.ESUtils;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class EventService {

	private final ESUtils esUtils;
	
	public ESEvent persistEvent(EventDTO eventDTO) {
		ESEvent esEvent = getESEventObject(eventDTO);
		return esUtils.putEventInES(esEvent);
	}

	private ESEvent getESEventObject(EventDTO eventDTO) {
		return ESEvent
				.builder()
				.id(UUID.randomUUID().toString())
				.eventType(eventDTO.getEventType())
				.eventName(eventDTO.getEventName())
				.channel(eventDTO.getChannel())
				.userId(eventDTO.getUserId())
				.properties(eventDTO.getProperties())
				.timestamp(new Date())
				.build();
	}
}
