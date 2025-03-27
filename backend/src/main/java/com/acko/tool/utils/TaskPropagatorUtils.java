package com.acko.tool.utils;

import com.acko.tool.entity.AssessmentBusinessEntity;
import com.acko.tool.entity.ProposalBusinessEntity;
import com.acko.tool.entity.Task;
import com.acko.tool.service.TasksService;
import lombok.AllArgsConstructor;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
@AllArgsConstructor
public class TaskPropagatorUtils {

    private final TasksService tasksService;

    public Object taskPropagatorFunction(DelegateExecution delegateExecution) throws Exception {
        {
            String businessEntity = delegateExecution.getVariable("task_business_entity").toString();
            String taskId = delegateExecution.getVariable("task_id").toString();
            String taskStatus = delegateExecution.getVariable("task_status").toString();
            String proposalId = delegateExecution.getVariable("reference_id").toString();
            String assessmentId = Objects.nonNull(delegateExecution.getVariable("assessment_id"))?delegateExecution.getVariable("assessment_id").toString():null;
            List<String> taskPropagatorUpdates = null;
//            List.of(delegateExecution.getVariable("delegate").toString());
            Object businessEntityUpdates = delegateExecution.getVariable("request");
            Task<Object> task = Task.builder().id(taskId).status(taskStatus).build();
            switch (businessEntity){
                case "proposal":
                    ProposalBusinessEntity proposalBusinessEntity = ProposalBusinessEntity.builder().taskPropagatorUpdates(taskPropagatorUpdates).proposalTaskUpdates(businessEntityUpdates).proposalId(proposalId).build();
                    task.setType("proposal");
                    task.setBusinessEntityImpl(proposalBusinessEntity);
                    break;
                case "assessment":
                    AssessmentBusinessEntity assessmentBusinessEntity = AssessmentBusinessEntity.builder().taskPropagatorUpdates(taskPropagatorUpdates).assessmentTaskUpdates(businessEntityUpdates).assessmentId(assessmentId).build();
                    task.setType("assessment");
                    task.setBusinessEntityImpl(assessmentBusinessEntity);
                    break;
            }
            return tasksService.createOrUpdateTasks(List.of(task));
        }
    }
}
