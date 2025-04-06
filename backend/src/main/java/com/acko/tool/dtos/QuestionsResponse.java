package com.acko.tool.dtos;

import com.acko.tool.entity.QuestionConfigResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data

public class QuestionsResponse {

    @JsonProperty("question_config")
    private QuestionConfigResponse questionConfig;

    @JsonProperty("rule_id")
    private String ruleId;

    @JsonProperty("section")
    private String section;

    @JsonProperty("eligible_members")
    private List<EligibleMember> eligibleMembers;
}
