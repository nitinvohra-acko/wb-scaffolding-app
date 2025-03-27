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

@Log4j2
@Component
@AllArgsConstructor
public class CompleteTelemer implements JavaDelegate {

    private final TasksService tasksService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("Completed Telemer for this case");
        Task<?> telemerTask = tasksService.fetchTaskById(delegateExecution.getVariable("task_id").toString());
        telemerTask.setStatus("telemer_completed");
        tasksService.createOrUpdateTasks(List.of(telemerTask));
    }
}
