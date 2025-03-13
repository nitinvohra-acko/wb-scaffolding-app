package com.acko.tool.repository.es;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.acko.tool.entity.search.user.ESUser;

public interface ESUserRepository extends ElasticsearchRepository<ESUser, String> {
}