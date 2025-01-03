package com.acko.tool.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.acko.tool.entity.Task;

public interface TaskRepository extends MongoRepository<Task<?>, String> {

}
