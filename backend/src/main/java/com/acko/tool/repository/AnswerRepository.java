package com.acko.tool.repository;

import com.acko.tool.entity.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnswerRepository extends MongoRepository<Answer, String> {
    List<Answer> findByReferenceIdAndSourceAndJourney(String referenceId, String source, String journey);

}