package com.acko.tool.repository;

import com.acko.tool.dtos.AnswerRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnswerRepository extends MongoRepository<AnswerRequest, String> {
    AnswerRequest findByReferenceIdAndSourceAndJourney(String referenceId, String source, String journey);
}