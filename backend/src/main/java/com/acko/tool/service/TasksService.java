package com.acko.tool.service;

import com.acko.tool.utils.JSONUtils;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
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
	private final JSONUtils jsonUtils;

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

	public Task<?> patchTaskById(Task<?> task) throws Exception {
		Optional<Task<?>> taskOptional = taskRepository.findById(task.getId());
		if (taskOptional.isPresent()) {
			// write patch functionality here to update fields sent in request task in taskOptional
			BeanUtils.copyProperties(task, taskOptional.get(), jsonUtils.getNullPropertyNames(task));
			return createOrUpdateTasks(List.of(taskOptional.get())).get(0);
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
