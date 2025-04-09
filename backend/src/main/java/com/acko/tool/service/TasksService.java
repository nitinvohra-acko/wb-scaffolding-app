package com.acko.tool.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.acko.tool.entity.Task;
import com.acko.tool.entity.TaskHistory;
import com.acko.tool.repository.mongo.TaskRepository;
import com.acko.tool.utils.ESUtils;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@AllArgsConstructor
@Log4j2
public class TasksService {

	private final TaskRepository taskRepository;
	private final TaskHistoryService taskHistoryService;
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

	
	public List<Task<?>> updateTasksWithTaskHistory(List<Task<?>> tasks) throws Exception {
		List<Task<?>> updatedTasks = new ArrayList<>();

		for (Task<?> task : tasks) {
			// Check if the task exists
			Optional<Task<?>> existingTaskOptional = taskRepository.findById(task.getId());
			if (!existingTaskOptional.isPresent()) {
				throw new RuntimeException("Task with ID " + task.getId() + " does not exist.");
			}

			// Get the existing task
			Task<?> existingTask = existingTaskOptional.get();

			// Create a TaskHistory entry
			TaskHistory taskHistory = new TaskHistory();
			taskHistory.setTaskId(existingTask.getId());
			taskHistory.setVersion(existingTask.getVersion());
			taskHistory.setCreatedDate(existingTask.getCreatedDate());
			taskHistory.setUpdatedDate(existingTask.getUpdatedDate());
			taskHistory.setCalculatedPriority(existingTask.getCalculatedPriority());
			taskHistory.setBusinessEntityImpl(existingTask.getBusinessEntityImpl());

			// Save TaskHistory
			taskHistoryService.saveTaskHistory(taskHistory);

			// Increment the version
			Integer newVersion = existingTask.getVersion() + 1;
			existingTask.setVersion(newVersion);

			// Save the updated task
			Task<?> updatedTask = taskRepository.save(existingTask);
			updatedTasks.add(updatedTask);

			// Update Elasticsearch
			try {
				esUtils.putTaskInES(updatedTask, null);
			} catch (Exception e) {
				log.error("Exception occurred while updating the task in Elasticsearch", e);
				throw e;
			}
		}

		return updatedTasks;
	}

	public void deleteTaskById(String id) {
		taskRepository.deleteById(id);
	}

}
