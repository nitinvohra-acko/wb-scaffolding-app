package com.acko.tool.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
public class QuestionConfigRequest {

    private String ruleId;

    private Map<String, Object> ruleAttributes;

    private String proposalId;
}
