package com.acko.tool.controller;

import com.acko.tool.entity.Event;
import com.acko.tool.entity.action.EventAction;
import com.acko.tool.entity.action.EventActionMetadata;
import com.acko.tool.service.action.ActionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/action")
@AllArgsConstructor
public class ActionController {
    private final ActionService actionService;

    @PostMapping("/metadata")
    public ResponseEntity<EventActionMetadata> saveMetadata(@RequestBody EventActionMetadata eventActionDTO)
        throws NoSuchFieldException {
        // Handle saving metadata
        return ResponseEntity.ok(actionService.getMetadata(eventActionDTO));
    }

    @PostMapping("/save_action")
    public ResponseEntity<EventAction> saveAction(@RequestBody EventAction saveActionDTO) {
        // Handle saving action
        return ResponseEntity.ok(actionService.saveAction(saveActionDTO));
    }

    @PostMapping("/post_event")
    public ResponseEntity<Event> postEvent(@RequestBody Event event) {
        // Handle saving action
        return ResponseEntity.ok(actionService.getActionsForEventAndExecute(event));
    }
}
