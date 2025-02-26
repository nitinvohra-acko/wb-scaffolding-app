package com.acko.tool.repository;

import com.acko.tool.entity.search.ESTask;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ESTaskRepository extends ElasticsearchRepository<ESTask, String> {
}