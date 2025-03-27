package com.acko.tool.service;

import com.acko.tool.dtos.*;
import com.acko.tool.entity.*;
import com.acko.tool.exception.HandleExecuteException;
import com.acko.tool.repository.AnswerRepository;
import com.acko.tool.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final AnswerRepository answerRepository;

    private final TasksService tasksService;

    private final ObjectMapper objectMapper;

    public List<QuestionConfigResponse> getQuestions(QuestionConfigRequest questionConfigRequest) {
        List<Question> questions = questionRepository.findByRuleId(questionConfigRequest.getRuleId());
        String ProposalId = questionConfigRequest.getProposalId();
        Task<?> task = tasksService.fetchProposalTaskByProposalId(ProposalId);
        if (task == null) {
            throw new HandleExecuteException("Task not found for proposalId: " + ProposalId);
        }
        Map<String, List<String>> genderUserIdMap = new HashMap<>();
        Map<String , String> userIdNameMap = new HashMap<>();

        ProposalTask proposalTask = objectMapper.convertValue(task, ProposalTask.class);
        ProposalBusinessEntity pr = objectMapper.convertValue(task.getBusinessEntityImpl(), ProposalBusinessEntity.class);
        for (Insured insured : proposalTask.getBusinessEntityImpl().getInsured()) {
                String gender = insured.getParameters().getGender().getValue().toLowerCase();
                String userId = insured.getParameters().getUserId().getValue();
                userIdNameMap.put(userId , insured.getParameters().getName().getValue());
                genderUserIdMap.computeIfAbsent(gender, k -> new ArrayList<>()).add(userId);
        }
        List<QuestionConfigResponse> result = new ArrayList<>();
        for(Question question : questions){
            result.add(QuestionConfigResponseFromQuestion(question,genderUserIdMap,userIdNameMap));
        }
    return result;
    }

    public QuestionConfigResponse QuestionConfigResponseFromQuestion(Question question, Map<String, List<String>> genderUserIdMap, Map<String, String> userIdNameMap){
        return QuestionConfigResponse.builder().questionConfig(question.getQuestionConfig())
                .questionId(question.getQuestionId())
                .ruleId(question.getRuleId())
                .section(question.getSection())
                .eligibleMembers(EligibilityToEligibleMembers(question.getQuestionConfig().getEligibility(),genderUserIdMap, userIdNameMap)).build();
    }

    public List<EligibleMember>EligibilityToEligibleMembers(Eligibility eligibility , Map<String, List<String>> genderUserIdMap,Map<String , String> userIdNameMap){
        List<String> eligibleMembers = new ArrayList<>();
        if(eligibility.isMale()){
            eligibleMembers.addAll(genderUserIdMap.get("male"));
        }
        if(eligibility.isFemale()){
            eligibleMembers.addAll(genderUserIdMap.get("female"));
        }
        return eligibleUser(eligibleMembers,userIdNameMap);
    }

    public List<EligibleMember> eligibleUser(List<String> eligibleMembers, Map<String , String> userIdNameMap){
        List<EligibleMember> eligibleUser = new ArrayList<>();
        for(String userId : eligibleMembers){
            eligibleUser.add(EligibleMember.builder()
                    .userId(userId)
                    .name(userIdNameMap.get(userId))
                    .build());
        }
        return eligibleUser;
    }


    public AnswerRequest getAnswers(Map<String,String> request){
            String referenceId = request.get("reference_id");
            String source = request.get("source");
            String journey = request.get("journey");
            return answerRepository.findByReferenceIdAndSourceAndJourney(referenceId, source, journey);
    }


//    public void dumpAnswers(AnswerRequest answerRequest) {
//        for (QuestionAnswerDTO question : answerRequest.getQuestions()) {
//            for (Map<String, Object> answerDetail : question.getAnswer()) {
//                Answer document = new Answer();
//                document.setJourney(answerRequest.getJourney());
//                document.setReferenceId(answerRequest.getReferenceId());
//                document.setSource(answerRequest.getSource());
//                document.setQuestionId(question.getQuestionId());
//                document.setUpdatedBy(question.getUpdatedBy());
//                document.setUserId((String) answerDetail.get("user_id"));
//                document.setAnswer(answerDetail.get("answer"));
//                document.setAnswerId(answerDetail.get("answer_id"));
//                answerRepository.save(document);
//            }
//        }
//    }
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
