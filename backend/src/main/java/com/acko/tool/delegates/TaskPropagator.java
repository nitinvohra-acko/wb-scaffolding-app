package com.acko.tool.delegates;

import com.acko.tool.entity.ProposalBusinessEntity;
import com.acko.tool.entity.Task;
import com.acko.tool.service.TasksService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@Log4j2
@AllArgsConstructor
public class TaskPropagator implements JavaDelegate {

    private final TasksService tasksService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        ProposalBusinessEntity proposalBusinessEntity = ProposalBusinessEntity.builder().proposalUsers(delegateExecution.getVariable("request")).proposalId(delegateExecution.getVariable("proposalId").toString()).build();
        Task<Object> task = Task.builder().id(delegateExecution.getVariable("task_id").toString()).status("in_progress").type("proposal").businessEntityImpl(proposalBusinessEntity).build();
        tasksService.createOrUpdateTasks(List.of(task));
    }
}
