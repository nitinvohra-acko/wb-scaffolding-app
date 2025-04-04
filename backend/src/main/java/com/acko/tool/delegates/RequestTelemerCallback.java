package com.acko.tool.delegates;

import com.acko.tool.entity.Task;
import com.acko.tool.service.TasksService;
import com.acko.tool.utils.TaskPropagatorUtils;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Log4j2
@AllArgsConstructor
public class RequestTelemerCallback implements JavaDelegate {

    private final TasksService tasksService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("User requested Telemer for this case");
        Task<?> telemerTask = Task.builder().workflowInstanceId(delegateExecution.getProcessInstanceId()).type("telemer").build();
        telemerTask.setStatus("telemer_callback_requested");
        telemerTask.setReferenceTaskId(delegateExecution.getVariable("reference_task_id").toString());
        telemerTask.setReferenceTaskWorkflowId( delegateExecution.getVariable("reference_task_workflow_id").toString());
        List<Task<?>> tasks = tasksService.createOrUpdateTasks(List.of(telemerTask));
        log.info("Created Task for Telemer " + tasks.get(0).getId());
        delegateExecution.setVariable("task_id", tasks.get(0).getId());
    }
}
