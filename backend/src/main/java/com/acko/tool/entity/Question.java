package com.acko.tool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document("Question")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
@Builder(toBuilder = true)
@Data
public class Question {

        @JsonProperty("question_config")
        public QuestionConfig questionConfig;

        @JsonProperty("rule_id")
        public String ruleId;

        @JsonProperty("section")
        public String section;

    }

    @Data
    class Option {
        @JsonProperty("capture_text")
        public int captureText;

        @JsonProperty("label")
        public String label;

        @JsonProperty("answer_id")
        public String answerId;
    }
