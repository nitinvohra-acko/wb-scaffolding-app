package com.acko.tool.controller;

import java.util.List;
import java.util.UUID;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	public List<Task<?>> updateTasks(@RequestBody List<Task<?>> tasks) throws Exception {
		if (CollectionUtils.isNotEmpty(tasks)) {
			tasks.forEach(t -> {
				if (t.getId() == null) {
					t.setId(UUID.randomUUID().toString());
				}
			});
			return taskService.createOrUpdateTasks(tasks);
		}
		return null;
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteTasks(@PathVariable String id) {
		taskService.deleteTaskById(id);
		return ResponseEntity.ok(true);
	}
	
	
//	@PostConstruct
//	public void abcd() throws ElasticsearchException, IOException {
//		Task<?> task = Task
//				.builder()
//				.id(UUID.randomUUID().toString())
//				.status("dkdfkd")
//				.priority("fkdmfkd")
//				.build();
//
//		IndexResponse response = elasticsearchClient.index(i -> i
//				  .index("task")
//				  .id(task.getId())
//				  .document(task));
//		KeycloakConfig.getInstance();
//	}
}
