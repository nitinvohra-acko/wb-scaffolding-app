package com.acko.tool.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Answer")
@Data
public class AnswerRequest {
    private String journey;

    @JsonProperty("reference_id")
    private String referenceId;

    private String source;

    private List<QuestionAnswerDTO> questions;
}