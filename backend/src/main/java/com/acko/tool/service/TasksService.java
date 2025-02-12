package com.acko.tool.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.acko.tool.entity.Task;
import com.acko.tool.repository.TaskRepository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.ElasticsearchException;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@AllArgsConstructor
@Log4j2
public class TasksService {

	private final TaskRepository taskRepository;
	private final ElasticsearchClient elasticsearchClient;

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
				elasticsearchClient.index(i -> i
						.index("task")
						.id(t.getId())
						.document(t));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
		return savedTasks;
	}

	public void deleteTaskById(String id) {
		taskRepository.deleteById(id);
	}

}
