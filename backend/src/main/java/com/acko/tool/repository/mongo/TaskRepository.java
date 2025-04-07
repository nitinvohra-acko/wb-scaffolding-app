package com.acko.tool.repository.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.acko.tool.entity.Task;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface TaskRepository extends MongoRepository<Task<?>, String> {

    @Query(value = "{ 'type': 'proposal', 'businessEntityImpl.proposalId': ?0 }")
    Optional<Task<?>> findByProposalId(String proposalId);
}