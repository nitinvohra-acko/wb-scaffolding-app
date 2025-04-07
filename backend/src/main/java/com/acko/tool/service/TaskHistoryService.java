package com.acko.tool.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.acko.tool.entity.TaskHistory;
import com.acko.tool.repository.TaskHistoryRepository;

@Service
public class TaskHistoryService {

    @Autowired
    private TaskHistoryRepository taskHistoryRepository;


    public List<TaskHistory> getTaskHistoryByTaskId(String taskId) {
        return taskHistoryRepository.findByTaskId(taskId);
    }


    public TaskHistory saveTaskHistory(TaskHistory taskHistory) {
        return taskHistoryRepository.save(taskHistory);
    }
}