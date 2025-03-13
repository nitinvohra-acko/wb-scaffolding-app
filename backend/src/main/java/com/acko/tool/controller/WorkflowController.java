package com.acko.tool.controller;

import com.acko.tool.dtos.WorkflowRequest;
import com.acko.tool.service.WorkflowService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @PutMapping(path = "{task_id}/initiate/workflow", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String initiateWorkflow(@PathVariable("task_id") String taskId, @RequestBody WorkflowRequest request) {
        return workflowService.initiateWorkflow(taskId, request);
    }
}
