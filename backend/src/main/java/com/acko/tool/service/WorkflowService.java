package com.acko.tool.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Log4j2
@RequiredArgsConstructor
public class WorkflowService {

    @Autowired
    private RuleEngineService ruleEngineService;

    public Object initiateWorkflow(String workflowName, Map<String,Object> request) {
        return ruleEngineService.startBpmnProcess(workflowName, request);
    }

    public Object sendEventToWorkflow(String workflowName, String messageName, Map<String,Object> request){
        ruleEngineService.sendEventToProcess(workflowName,messageName,request);
        return "success";
    }
}
