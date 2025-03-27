package com.acko.tool.repository.es;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.acko.tool.entity.search.event.ESEvent;

public interface ESEventRepository extends ElasticsearchRepository<ESEvent, String> {
}