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
@NoArgsConstructor
@Data
public class Question {

        @JsonProperty("question_config")
        private QuestionConfig questionConfig;

        @JsonProperty("question_id")
        private String questionId;

        @JsonProperty("rule_id")
        private String ruleId;

    }

    @Data
    class QuestionConfig {
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
    }

    @Data
    class Option {
        @JsonProperty("capture_text")
        private int captureText;

        @JsonProperty("label")
        private String label;

        @JsonProperty("answer_id")
        private String answerId;
    }

    @Data
    class SubQuestion {
        @JsonProperty("answer_id")
        private String answerId;

        @JsonProperty("question_text")
        private List<String> questionText;

        @JsonProperty("question_id")
        private String questionId;

        @JsonProperty("type")
        private String type;

        @JsonProperty("required")
        private int required;
    }
