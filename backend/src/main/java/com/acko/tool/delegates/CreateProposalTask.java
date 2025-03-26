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
public class CreateProposalTask implements JavaDelegate {

    private final TasksService tasksService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("Create Proposal Task");
        Task<Object> task = Task.builder().type("proposal").workflowInstanceId(delegateExecution.getProcessInstanceId()).build();
        List<Task<?>> tasks = tasksService.createOrUpdateTasks(List.of(task));
        delegateExecution.setVariable("task_id", tasks.get(0).getId());
    }
}
