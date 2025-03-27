package com.acko.tool.delegates;

import com.acko.tool.entity.Task;
import com.acko.tool.service.TasksService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.util.List;


@Log4j2
@Component
@AllArgsConstructor
public class Accepted implements JavaDelegate {

    private final TasksService tasksService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        String taskId = delegateExecution.getVariable("task_id").toString();
        Task<?> proposalTask = tasksService.fetchTaskById(taskId);
        proposalTask.setStatus("proposal_accepted");
        tasksService.createOrUpdateTasks((List.of(proposalTask)));
    }
}
