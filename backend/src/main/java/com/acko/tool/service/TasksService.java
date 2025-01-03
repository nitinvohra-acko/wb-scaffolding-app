package com.acko.tool.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.acko.tool.entity.Task;
import com.acko.tool.repository.TaskRepository;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@AllArgsConstructor
@Log4j2
public class TasksService {

	private final TaskRepository taskRepository;

	public List<Task<?>> fetchAllTasks() {
		return taskRepository.findAll();
	}
	
	public Task<?> fetchTaskById(String id) {
		Optional<Task<?>> taskOptional = taskRepository.findById(id);
		if (taskOptional.isPresent()) {
			return taskOptional.get();
		}
		return null;
	}

	public void createOrUpdateTasks(List<Task<?>> tasks) {
		taskRepository.saveAll(tasks);
	}

}
