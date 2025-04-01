package com.acko.tool.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acko.tool.dto.EventDTO;
import com.acko.tool.entity.search.event.ESEvent;
import com.acko.tool.service.EventService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor
@Slf4j
public class EventController {
	
	private final EventService eventService;
	
    @PostMapping
	public ESEvent persistEvent(@RequestBody @Valid EventDTO eventDTO) {
        try {
        	return eventService.persistEvent(eventDTO);
        } catch (Exception e) {
            log.error("Exception occurred while persisting event", e);
            throw new RuntimeException(e);
        }
    }
}
