package com.acko.tool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;
import java.util.Map;


@Data
public class BaseQuestionConfig {
        @JsonProperty("option")
        public List<Option> options;

        @JsonProperty("order")
        public int order;

        @JsonProperty("question_text")
        public List<String> questionText;

        @JsonProperty("sub_question_mapping")
        public Map<String, List<String>> subQuestionMapping;

        @JsonProperty("question_id")
        public String questionId;

        @JsonProperty("type")
        public String type;

        @JsonProperty("required")
        public int required;

        @JsonProperty("eligibility")
        public Eligibility eligibility;
    }
