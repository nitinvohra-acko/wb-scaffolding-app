package com.acko.tool.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.acko.tool.entity.Task;
import com.acko.tool.repository.mongo.TaskRepository;
import com.acko.tool.utils.ESUtils;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@AllArgsConstructor
@Log4j2
public class TasksService {

	private final TaskRepository taskRepository;
	private final ESUtils esUtils;

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

	public List<Task<?>> createOrUpdateTasks(List<Task<?>> tasks) throws Exception {
		List<Task<?>> savedTasks = taskRepository.saveAll(tasks);
		savedTasks.forEach(t -> {
			try {
				esUtils.putTaskInES(t, null);
//				elasticsearchClient.index(i -> i
//						.index("task")
//						.id(t.getId())
//						.document(t));
			} catch (Exception e) {
				log.error("Exception ocuurred while creating/updating the task", e);
				throw e;
			}
		});
		return savedTasks;
	}

	public void deleteTaskById(String id) {
		taskRepository.deleteById(id);
	}

}
