package com.acko.tool.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.acko.tool.config.properties.ElasticSearchConfigProperties;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class ElasticSearchConfig {

	private final ElasticSearchConfigProperties elasticSearchConfigProperties;
	
	@Bean
	public ElasticsearchClient elasticsearchClient() {

		RestClient restClient = RestClient.builder(HttpHost.create(elasticSearchConfigProperties.getUrl())).build();
		ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
		return new ElasticsearchClient(transport);
	}
	
}