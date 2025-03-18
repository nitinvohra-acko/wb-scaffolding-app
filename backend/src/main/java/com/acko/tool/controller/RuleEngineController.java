package com.acko.tool.controller;

import com.acko.tool.service.RuleEngineService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController("ruleEngineController")
@RequestMapping("/rules")
@Log4j2
public class RuleEngineController {

    @Autowired
    RuleEngineService ruleEngineService;

    @PostMapping(value = "/bpmn/deploy-xml", produces = MediaType.APPLICATION_XML_VALUE, consumes = MediaType.APPLICATION_XML_VALUE)
    public Object deployBpmnXml(@Valid @RequestParam String name,
                               @RequestBody String genericRuleObject) {
        return ruleEngineService.deployBpmnXml(name, genericRuleObject);
    }

    @PostMapping(value = "/dmn/deploy-xml", produces = MediaType.APPLICATION_XML_VALUE, consumes = MediaType.APPLICATION_XML_VALUE)
    public Object deployDmnXml(@Valid @RequestParam String name,
                               @RequestBody String genericRuleObject) {
        return ruleEngineService.deployDmnXml(name, genericRuleObject);
    }

    @PostMapping(value = "/{ruleId}/evaluate")
    public Object execute(@PathVariable("ruleId") String ruleId, @RequestBody Map<String, Object> stringObjectMap) {
        return ruleEngineService.execute(ruleId, stringObjectMap);
    }

    @PostMapping(value = "/{ruleId}/initiate")
    public Object initiateBpmnProcess(@PathVariable("ruleId") String ruleId, @RequestBody Map<String, Object> stringObjectMap) {
        return ruleEngineService.startBpmnProcess(ruleId, stringObjectMap);
    }

}
