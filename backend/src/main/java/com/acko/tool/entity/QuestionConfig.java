package com.acko.tool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class QuestionConfig extends BaseQuestionConfig {

        @JsonProperty("subQuestions")
        public List<Question> subQuestions;
}
