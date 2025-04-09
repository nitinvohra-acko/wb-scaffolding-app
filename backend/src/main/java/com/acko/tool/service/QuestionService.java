package com.acko.tool.service;

import com.acko.tool.dtos.*;
import com.acko.tool.entity.*;
import com.acko.tool.exception.HandleExecuteException;
import com.acko.tool.repository.AnswerRepository;
import com.acko.tool.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final AnswerRepository answerRepository;

    private final TasksService tasksService;

    private final ObjectMapper objectMapper;

    public List<QuestionsResponse> getQuestions(QuestionConfigRequest questionConfigRequest) {
        List<Question> questions = questionRepository.findByRuleId(questionConfigRequest.getRuleId());
        String ProposalId = questionConfigRequest.getProposalId();
        Task<?> task = tasksService.fetchProposalTaskByProposalId(ProposalId);
        if (task == null) {
            throw new HandleExecuteException("Task not found for proposalId: " + ProposalId);
        }

        Map<String, List<EligibleMember>> genderUserMap = new HashMap<>();
        ProposalTask proposalTask = objectMapper.convertValue(task, ProposalTask.class);
        ProposalBusinessEntity pr = objectMapper.convertValue(task.getBusinessEntityImpl(), ProposalBusinessEntity.class);
        for (Insured insured : proposalTask.getBusinessEntityImpl().getInsured()) {
                String gender = insured.getParameters().getGender().getValue().toLowerCase();
                EligibleMember eligibleMember = EligibleMember.builder()
                    .userId(insured.getParameters().getUserId().getValue())
                    .name(insured.getParameters().getName().getValue())
                    .build();
            genderUserMap.computeIfAbsent(gender, k -> new ArrayList<>()).add(eligibleMember);
        }

        List<QuestionsResponse> result = new ArrayList<>();
        for(Question question : questions){
            result.add(QuestionConfigResponseFromQuestion(question,genderUserMap));
        }
    return result;
    }

    public QuestionsResponse QuestionConfigResponseFromQuestion(Question question, Map<String, List<EligibleMember>> genderUserMap) {
        QuestionConfig questionConfig = question.getQuestionConfig();
        QuestionsResponse questionsResponseBuilder = QuestionsResponse.builder()
                .ruleId(question.getRuleId())
                .section(question.getSection())
                .eligibleMembers(EligibilityToEligibleMembers(question.getQuestionConfig().getEligibility(), genderUserMap)).build();
        List<QuestionsResponse> subQuestionResponses = new ArrayList<>();
        if (questionConfig.getSubQuestions() != null) {
            for (Question subQuestion : questionConfig.getSubQuestions()) {
                if(subQuestion.getQuestionConfig() != null)
                subQuestionResponses.add(QuestionConfigResponseFromQuestion(subQuestion, genderUserMap));
            }
        }
            QuestionConfigResponse questionConfigResponse = getQuestionConfigResponse(questionConfig);
            questionConfigResponse.setSubQuestions(subQuestionResponses);
            questionsResponseBuilder.setQuestionConfig(questionConfigResponse);

        return questionsResponseBuilder;
    }

    public QuestionConfigResponse getQuestionConfigResponse(QuestionConfig questionConfig){
        QuestionConfigResponse questionConfigResponse = new QuestionConfigResponse();
        questionConfigResponse.setOptions(questionConfig.getOptions());
        questionConfigResponse.setOrder(questionConfig.getOrder());
        questionConfigResponse.setQuestionText(questionConfig.getQuestionText());
        questionConfigResponse.setSubQuestionMapping(questionConfig.getSubQuestionMapping());
        questionConfigResponse.setQuestionId(questionConfig.getQuestionId());
        questionConfigResponse.setType(questionConfig.getType());
        questionConfigResponse.setRequired(questionConfig.getRequired());
        questionConfigResponse.setEligibility(questionConfig.getEligibility());

        return questionConfigResponse;
    }

    public List<EligibleMember> EligibilityToEligibleMembers(Eligibility eligibility , Map<String, List<EligibleMember>> genderUserMap){
        List<EligibleMember> eligibleMembers = new ArrayList<>();
        if(eligibility.isMale() && genderUserMap.containsKey("male")){
            eligibleMembers.addAll(genderUserMap.get("male"));
        }
        if(eligibility.isFemale() && genderUserMap.containsKey("female")){
            eligibleMembers.addAll(genderUserMap.get("female"));
        }
        return eligibleMembers;
    }


    public AnswerRequest getAnswers(Map<String,String> request){
            String referenceId = request.get("reference_id");
            String source = request.get("source");
            String journey = request.get("journey");
            if (referenceId == null || source == null || journey == null) {
                throw new HandleExecuteException("Missing required parameters: reference_id, source, journey");
            }
            return answerRepository.findByReferenceIdAndSourceAndJourney(referenceId, source, journey);
    }

    public void dumpAnswers(AnswerRequest answerRequest) {
        answerRepository.save(answerRequest);
    }


    public List<Question> fetchAllTasks() {
        return questionRepository.findAll();
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }
}
