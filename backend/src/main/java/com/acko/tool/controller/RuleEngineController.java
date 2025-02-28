package com.acko.tool.controller;

import com.acko.tool.dtos.GenericRuleObject;
import com.acko.tool.service.RuleEngineService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.model.dmn.Dmn;
import org.camunda.bpm.model.dmn.DmnModelInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController("ruleEngineController")
@RequestMapping("/rules")
@Log4j2
public class RuleEngineController {

    @Autowired
    RepositoryService repositoryService;
    @Autowired
    ProcessEngine processEngine;
    @Autowired
    RuleEngineService ruleEngineService;

    @GetMapping(value = "/dmn-xml", produces = MediaType.APPLICATION_XML_VALUE)
    public Object getDmnXml(@RequestBody GenericRuleObject genericRuleObject) {
        DmnModelInstance dmnModelInstance = genericRuleObject.toDmnModel();
        return Dmn.convertToString(dmnModelInstance);
    }

    @PostMapping(value = "/deploy-xml", produces = MediaType.APPLICATION_XML_VALUE, consumes = MediaType.APPLICATION_XML_VALUE)
    public Object deployDmnXml(@Valid @RequestParam String name,
                               @RequestBody String genericRuleObject) {
        return ruleEngineService.deployDmnXml(name, genericRuleObject);
    }

    @PostMapping(value = "/deploy", produces = MediaType.APPLICATION_XML_VALUE)
    public Object deployDmn(@RequestBody GenericRuleObject genericRuleObject) {
        return ruleEngineService.deployDmn(genericRuleObject);
    }

    @PostMapping(value = "/{ruleId}/evaluate")
    public Object execute(@PathVariable("ruleId") String ruleId, @RequestBody Map<String, Object> stringObjectMap) {
        return ruleEngineService.execute(ruleId, stringObjectMap);
    }

}
