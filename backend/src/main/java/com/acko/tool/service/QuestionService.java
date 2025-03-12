package com.acko.tool.service;

import com.acko.tool.dtos.QuestionConfigRequest;
import com.acko.tool.dtos.QuestionConfigResponse;
import com.acko.tool.entity.Question;
import com.acko.tool.entity.Task;
import com.acko.tool.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;


    public QuestionConfigResponse getQuestions(QuestionConfigRequest questionConfigRequest) {
        List<Question> questions = questionRepository.findByRuleId(questionConfigRequest.getRuleId());

        return QuestionConfigResponse.builder()
                .question_config_result(questions)
                .build();
    }

    public List<Question> fetchAllTasks() {
        return questionRepository.findAll();
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }
}
