package com.acko.tool.dtos;

import com.acko.tool.entity.Question;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class QuestionConfigResponse {
    List<Question> question_config_result;
}
