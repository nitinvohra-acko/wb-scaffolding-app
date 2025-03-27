package com.acko.tool.dtos;

import com.acko.tool.entity.QuestionConfig;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Builder
@Data
public class QuestionConfigResponse {

    @JsonProperty("question_config")
    private QuestionConfig questionConfig;

    @JsonProperty("question_id")
    private String questionId;

    @JsonProperty("rule_id")
    private String ruleId;

    @JsonProperty("section")
    private String section;

    @JsonProperty("eligible_members")
    private List<EligibleMember> eligibleMembers;
}
