package com.acko.tool.repository.es;

import com.acko.tool.entity.search.ESTask;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ESTaskRepository extends ElasticsearchRepository<ESTask, String> {
}