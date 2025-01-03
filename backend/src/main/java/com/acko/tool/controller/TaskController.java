package com.acko.tool.controller;

import java.util.List;
import java.util.UUID;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acko.tool.entity.Task;
import com.acko.tool.service.TasksService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/task")
@AllArgsConstructor
public class TaskController {

	private final TasksService taskService;

	@GetMapping
	public List<Task<?>> getAllTasks() {
		return taskService.fetchAllTasks();
	}
	
	@GetMapping("{id}")
	public Task<?> getTaskById(@PathVariable String id) {
		return taskService.fetchTaskById(id);
	}

	@PostMapping
	public void updateTasks(@RequestBody List<Task<?>> tasks) {
		if (CollectionUtils.isNotEmpty(tasks)) {
			tasks.forEach(t -> t.setId(UUID.randomUUID().toString()));
			taskService.createOrUpdateTasks(tasks);
		}
	}
}
