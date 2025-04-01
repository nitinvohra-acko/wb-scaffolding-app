package com.acko.tool.repository;

import com.acko.tool.entity.action.EventAction;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ActionRepository extends MongoRepository<EventAction, String> {
    @Query(value = "{ 'eventId': ?0, 'isActive': ?1 }")
    List<EventAction> getActionByEventId(String event, boolean isActive);
}

