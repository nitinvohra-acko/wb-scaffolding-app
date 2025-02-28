package com.acko.tool.service;

import com.acko.tool.dtos.GenericRuleObject;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.model.dmn.Dmn;
import org.camunda.bpm.model.dmn.DmnModelInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
@Log4j2
public class RuleEngineService {

    @Autowired
    RepositoryService repositoryService;

    @Autowired
    ProcessEngine processEngine;

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

    public Object deployDmnXml(String name, String genericRuleObject) {
        processEngine.getRepositoryService()
                .createDeployment()
                .name(name)
                .addString(name + ".dmn", genericRuleObject)
                .enableDuplicateFiltering(true)
                .deploy();
        return genericRuleObject;
    }

    public Object deployDmn(GenericRuleObject genericRuleObject) {
        DmnModelInstance dmnModelInstance = genericRuleObject.toDmnModel();
        processEngine.getRepositoryService()
                .createDeployment()
                .name(genericRuleObject.getRuleId())
                .addModelInstance(genericRuleObject.getRuleId()+".dmn", dmnModelInstance)
                .enableDuplicateFiltering(true)
                .deploy();
        return Dmn.convertToString(dmnModelInstance);
    }

}
