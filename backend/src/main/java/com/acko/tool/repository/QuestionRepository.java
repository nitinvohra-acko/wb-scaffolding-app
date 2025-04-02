package com.acko.tool.repository;

import com.acko.tool.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {

    List<Question> findByRuleId(String ruleId);


}
