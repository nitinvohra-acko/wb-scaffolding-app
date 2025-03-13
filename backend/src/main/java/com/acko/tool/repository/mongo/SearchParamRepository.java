package com.acko.tool.repository.mongo;

import com.acko.tool.entity.search.SearchParam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface SearchParamRepository extends MongoRepository<SearchParam, String> {

    @Query(value = "{ 'entity': ?0, 'isActive': ?1 }")
    SearchParam findSearchParamByEntity(String entity, boolean isActive);
}
