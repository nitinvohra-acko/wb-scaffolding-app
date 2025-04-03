package com.acko.tool.controller;

import com.acko.tool.dto.EventDTO;
import com.acko.tool.entity.action.EventAction;
import com.acko.tool.entity.action.EventActionMetadata;
import com.acko.tool.service.action.ActionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/action")
@AllArgsConstructor
public class ActionController {
    private final ActionService actionService;

    @GetMapping("/metadata")
    public ResponseEntity<EventActionMetadata> saveMetadata()
        throws NoSuchFieldException {
        // Handle saving metadata
        return ResponseEntity.ok(actionService.getMetadata());
    }

    @PostMapping("/save")
    public ResponseEntity<EventAction> saveAction(@RequestBody EventAction saveActionDTO) {
        // Handle saving action
        return ResponseEntity.ok(actionService.saveAction(saveActionDTO));
    }

    @PostMapping("/post_event")
    public ResponseEntity<EventDTO> postEvent(@RequestBody EventDTO event) throws Exception {
        // Handle saving action
        return ResponseEntity.ok(actionService.getActionsForEventAndExecute(event));
    }
}
