package com.acko.tool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class QuestionConfig {
        @JsonProperty("sub_questions")
        private List<SubQuestion> subQuestions;

        @JsonProperty("option")
        private List<Option> options;

        @JsonProperty("order")
        private int order;

        @JsonProperty("question_text")
        private List<String> questionText;

        @JsonProperty("sub_question_mapping")
        private Map<String, List<String>> subQuestionMapping;

        @JsonProperty("question_id")
        private String questionId;

        @JsonProperty("type")
        private String type;

        @JsonProperty("required")
        private int required;

        @JsonProperty("eligibility")
        private Eligibility eligibility;
    }
