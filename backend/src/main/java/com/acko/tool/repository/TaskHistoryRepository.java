package com.acko.tool.repository;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.acko.tool.entity.TaskHistory;

public interface TaskHistoryRepository extends MongoRepository<TaskHistory<?>, String> {
    List<TaskHistory> findByTaskId(String taskId);
}