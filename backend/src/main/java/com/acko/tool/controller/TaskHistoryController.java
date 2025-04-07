package com.acko.tool.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acko.tool.entity.TaskHistory;
import com.acko.tool.service.TaskHistoryService;

@RestController
@RequestMapping("/tasksHistory")
public class TaskHistoryController {

    @Autowired
    private TaskHistoryService taskHistoryService;

    @PostMapping({"/history", "/history/{versionId}"}) // Support both with and without versionId
    public ResponseEntity<?> getTaskHistory(
            @PathVariable(required = false) Integer versionId,
            @RequestBody Map<String, String> request) {
        String taskId = request.get("taskId");

        if (taskId == null || taskId.isEmpty()) {
            throw new IllegalArgumentException("Task ID is required");
        }

        List<TaskHistory> history = taskHistoryService.getTaskHistoryByTaskId(taskId);

        if (versionId != null) {
            // Fetch specific version if versionId is provided
            TaskHistory specificHistory = history.stream()
                    .filter(h -> h.getVersion()==versionId) // Ensure correct comparison
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Version not found"));

            return ResponseEntity.ok(specificHistory);
        } else {
            // Return all versions if versionId is not provided
            return ResponseEntity.ok(history);
        }
    }
}
