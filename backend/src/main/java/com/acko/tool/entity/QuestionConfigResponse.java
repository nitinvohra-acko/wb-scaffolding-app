package com.acko.tool.entity;

import com.acko.tool.dtos.QuestionsResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class QuestionConfigResponse extends BaseQuestionConfig { 
    @JsonProperty("subQuestions")
    public List<QuestionsResponse> subQuestions;
}
