package com.acko.tool.dtos;

import org.camunda.bpm.model.dmn.Dmn;
import org.camunda.bpm.model.dmn.DmnModelInstance;
import org.camunda.bpm.model.dmn.HitPolicy;
import org.camunda.bpm.model.dmn.instance.*;

import java.util.List;
import java.util.Objects;

public class GenericRuleObject {
    String ruleId;
    String ruleName;
    String version;
    HitPolicy hitPolicy;
    List<CellEntry> inputHeaders;
    List<CellEntry> outputHeaders;
    List<RulesRows> rowsList;

    public String getRuleId() {
        return ruleId;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    public String getRuleEntry() {
        return ruleId;
    }

    public void setRuleEntry(String ruleEntry) {
        this.ruleId = ruleEntry;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public HitPolicy getHitPolicy() {
        return hitPolicy;
    }

    public void setHitPolicy(HitPolicy hitPolicy) {
        this.hitPolicy = hitPolicy;
    }

    public List<RulesRows> getRowsList() {
        return rowsList;
    }

    public void setRowsList(List<RulesRows> rowsList) {
        this.rowsList = rowsList;
    }

    public List<CellEntry> getInputHeaders() {
        return inputHeaders;
    }

    public void setInputHeaders(List<CellEntry> inputHeaders) {
        this.inputHeaders = inputHeaders;
    }

    public List<CellEntry> getOutputHeaders() {
        return outputHeaders;
    }

    public void setOutputHeaders(List<CellEntry> outputHeaders) {
        this.outputHeaders = outputHeaders;
    }

    public DmnModelInstance toDmnModel(){
        DmnModelInstance modelInstance = Dmn.createEmptyModel();
        Definitions definitions = modelInstance.newInstance(Definitions.class);
        definitions.setNamespace("http://camunda.org/schema/1.0/dmn");
        definitions.setName("definitions");
        definitions.setNamespace("http://camunda.org/schema/1.0/dmn");
        modelInstance.setDefinitions(definitions);
        Decision decision = modelInstance.newInstance(Decision.class);
        decision.setId(ruleId);
        decision.setName(ruleName);
        definitions.addChildElement(decision);

        DecisionTable decisionTable = modelInstance.newInstance(DecisionTable.class);
        decisionTable.setHitPolicy(hitPolicy);
        decision.addChildElement(decisionTable);

        inputHeaders.forEach(in-> {
                    Input input = modelInstance.newInstance(Input.class);
                    input.setLabel(in.key);
                    InputExpression inputExpression = modelInstance.newInstance(InputExpression.class);
                    inputExpression.setTypeRef(in.dataType);
                    Text text = modelInstance.newInstance(Text.class);
                    text.setTextContent(String.valueOf(in.value));
                    inputExpression.setText(text);
                    input.addChildElement(inputExpression);
                    decisionTable.addChildElement(input);
                });
        outputHeaders.forEach(out->{
            Output output = modelInstance.newInstance(Output.class);
            output.setLabel(out.getKey());
            output.setName(String.valueOf(out.value));
            output.setTypeRef(out.dataType);
            decisionTable.addChildElement(output);
        });

        rowsList.forEach(rulesRows -> {
            Rule rule = modelInstance.newInstance(Rule.class);
            rulesRows.getInputEntries().forEach(in->{
                Text text1 = modelInstance.newInstance(Text.class);
                if(Objects.nonNull(in.value)){
                    if(in.value instanceof String){
                        text1.setTextContent("\""+in.value+"\"");
                    } else if(in.value instanceof List){
                        StringBuilder values = new StringBuilder();
                        ((List<?>) in.value).forEach(val -> {
                            values.append("\"")
                                    .append(val)
                                    .append("\"").append(",");
                        });
                        values.deleteCharAt(values.length()-1);
                        text1.setTextContent(values.toString());
                    }
                }
                InputEntry inputEntry = modelInstance.newInstance(InputEntry.class);
                inputEntry.addChildElement(text1);
                rule.addChildElement(inputEntry);
            });
            rulesRows.getOutputEntries().forEach(out->{
                OutputEntry outputEntry = modelInstance.newInstance(OutputEntry.class);
                Text text = modelInstance.newInstance(Text.class);
                if(out.value instanceof String){
                    text.setTextContent("\""+out.value+"\"");
                }
                if("Any".equalsIgnoreCase(out.dataType))
                {
                    text.setTextContent("" + out.value);
                }
                outputEntry.addChildElement(text);
                rule.addChildElement(outputEntry);
            });

            decisionTable.addChildElement(rule);
        });
        Dmn.validateModel(modelInstance);
        return modelInstance;
    }
}
