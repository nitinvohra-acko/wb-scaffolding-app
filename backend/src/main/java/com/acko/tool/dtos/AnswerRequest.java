package com.acko.tool.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class AnswerRequest {
    private String journey;

    @JsonProperty("reference_id")
    private String referenceId;

    private String source;

    private List<QuestionAnswerDTO> questions;
}