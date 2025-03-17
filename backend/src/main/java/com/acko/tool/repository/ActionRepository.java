package com.acko.tool.repository;

import com.acko.tool.entity.action.Action;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActionRepository extends MongoRepository<Action, String> {

}

