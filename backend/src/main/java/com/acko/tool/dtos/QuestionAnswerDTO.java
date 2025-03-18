package com.acko.tool.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class QuestionAnswerDTO {
    @JsonProperty("question_id")
    private String questionId;

    private List<String> question;

    private List<Map<String, Object>> answer;

    @JsonProperty("updated_by")
    private String updatedBy;
}