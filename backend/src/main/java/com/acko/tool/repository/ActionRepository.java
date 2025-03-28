package com.acko.tool.repository;

import com.acko.tool.entity.action.Action;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ActionRepository extends MongoRepository<Action, String> {
    @Query(value = "{ 'eventId': ?0, 'isActive': ?1 }")
    List<Action> getActionByEventId(String event, boolean isActive);
}

