package com.acko.tool.repository;

import com.acko.tool.entity.Search.SearchParam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface SearchParamRepository extends MongoRepository<SearchParam, String> {

    @Query(value = "{ 'entity': ?0, 'active': ?1 }")
    SearchParam findSearchParamByEntity(String entity, boolean isActive);
}
