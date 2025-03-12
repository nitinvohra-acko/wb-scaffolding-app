package com.acko.tool.controller;

import com.acko.tool.dtos.QuestionConfigRequest;
import com.acko.tool.dtos.QuestionConfigResponse;
import com.acko.tool.entity.Question;
import com.acko.tool.service.QuestionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.acko.tool.Constants.Constants.ASSESSMENT_CONFIG;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    QuestionService questionService;


    @PostMapping(path= ASSESSMENT_CONFIG, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<QuestionConfigResponse> evaluateQuestionConfig(
            @RequestBody QuestionConfigRequest questionConfigRequest) throws JsonProcessingException {
        return ResponseEntity.ok(questionService.getQuestions(questionConfigRequest));
    }

    @PostMapping(path="/addQuestions", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question savedQuestion = questionService.addQuestion(question);
        return ResponseEntity.ok(savedQuestion);
    }
}

