package com.acko.tool.controller;

import com.acko.tool.dtos.WorkflowRequest;
import com.acko.tool.service.WorkflowService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@AllArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @PutMapping(path = "/initiate/workflow", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Object initiateWorkflow(@RequestBody Map<String,Object> request) {
        return workflowService.initiateWorkflow(request);
    }
}
