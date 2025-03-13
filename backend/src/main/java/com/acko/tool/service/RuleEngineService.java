package com.acko.tool.service;

import com.acko.tool.dtos.GenericRuleObject;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.model.dmn.Dmn;
import org.camunda.bpm.model.dmn.DmnModelInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

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

    public Object execute(String ruleId, Map<String, Object> stringObjectMap) {
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .processDefinitionKey(ruleId)
                .latestVersion()
                .singleResult();
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceById(processDefinition.getId(), stringObjectMap);
        return null;
    }

    public Object deployDmnXml(String name, String genericRuleObject) {
        processEngine.getRepositoryService()
                .createDeployment()
                .name(name)
                .addString(name + ".bpmn", genericRuleObject)
                .enableDuplicateFiltering(true)
                .deploy();
        return genericRuleObject;
    }

    public Object deployDmn(GenericRuleObject genericRuleObject) {
        DmnModelInstance dmnModelInstance = genericRuleObject.toDmnModel();
        processEngine.getRepositoryService()
                .createDeployment()
                .name(genericRuleObject.getRuleId())
                .addModelInstance(genericRuleObject.getRuleId()+".bpmn", dmnModelInstance)
                .enableDuplicateFiltering(true)
                .deploy();
        return Dmn.convertToString(dmnModelInstance);
    }

}
