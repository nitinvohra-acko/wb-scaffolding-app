package com.acko.tool.service;

import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.model.dmn.DmnModelInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Log4j2
public class RuleEngineService {

    @Autowired
    ProcessEngine processEngine;

    @Autowired
    RepositoryService repositoryService;

    @Autowired
    RuntimeService runtimeService;

    public Object startBpmnProcess(String ruleId, Map<String, Object> stringObjectMap) {
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .processDefinitionKey(ruleId)
                .latestVersion()
                .singleResult();
        return runtimeService
                .startProcessInstanceById(processDefinition.getId(), stringObjectMap);
    }

    public Object execute(String ruleId, Map<String, Object> stringObjectMap) {
        String decisionDefinitionId = repositoryService
                .createDecisionDefinitionQuery()
                .decisionDefinitionKey(ruleId)
                .latestVersion().singleResult().getId();
        DmnModelInstance dmnModelInstance = processEngine.getRepositoryService().getDmnModelInstance(decisionDefinitionId);
        if (Objects.nonNull(dmnModelInstance)) {
            return processEngine.getDecisionService()
                    .evaluateDecisionById(decisionDefinitionId).variables(stringObjectMap).evaluate();
        }
        return null;
    }

    public Object deployBpmnXml(String name, String genericRuleObject) {
        processEngine.getRepositoryService()
                .createDeployment()
                .name(name)
                .addString(name + ".bpmn", genericRuleObject)
                .enableDuplicateFiltering(true)
                .deploy();
        return genericRuleObject;
    }

    public Object deployDmnXml(String name, String genericRuleObject) {
        processEngine.getRepositoryService()
                .createDeployment()
                .name(name)
                .addString(name + ".dmn", genericRuleObject)
                .enableDuplicateFiltering(true)
                .deploy();
        return genericRuleObject;
    }

    public void sendEventToProcess(String waitEvent, String eventName, Map<String,Object> request){
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
                .processInstanceId(request.get("workflow_id").toString())
                .processDefinitionKey("StartTelemerWorkflow")
                .singleResult();

        runtimeService.createMessageCorrelation(eventName)
                .setVariable("event", request.get("decision").toString())
                .processInstanceId(processInstance.getId())
                .correlate();
        log.info("Pushed Event Successfully {}", eventName);
    }

}
