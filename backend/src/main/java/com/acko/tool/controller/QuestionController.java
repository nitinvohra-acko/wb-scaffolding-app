package com.acko.tool.controller;

import com.acko.tool.dtos.AnswerRequest;
import com.acko.tool.dtos.QuestionConfigRequest;
import com.acko.tool.dtos.QuestionsResponse;
import com.acko.tool.entity.Question;
import com.acko.tool.service.QuestionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.acko.tool.constants.Constants.*;


@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @PostMapping(path= ASSESSMENT_CONFIG, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<QuestionsResponse>> evaluateQuestionConfig(
            @RequestBody QuestionConfigRequest questionConfigRequest) throws JsonProcessingException {
        return ResponseEntity.ok(questionService.getQuestions(questionConfigRequest));
    }

    @PostMapping(path=ADD_QUESTION, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question savedQuestion = questionService.addQuestion(question);
        return ResponseEntity.ok(savedQuestion);
    }


    @PostMapping(path =ANSWERS, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String,String >> dumpAnswers(@RequestBody AnswerRequest answerRequest) {
        questionService.dumpAnswers(answerRequest);
        Map<String, String> response = Map.of("message","Answers dumped successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping(path=GETANSWERS, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AnswerRequest> getAnswers(
            @RequestBody Map<String,String> request) throws JsonProcessingException {
        AnswerRequest response = questionService.getAnswers(request);
        if(response==null){
            return  ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}

