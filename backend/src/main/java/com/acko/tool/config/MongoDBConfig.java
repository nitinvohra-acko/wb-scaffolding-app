package com.acko.tool.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;

import com.acko.tool.config.properties.MongoDBProperties;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableMongoAuditing
public class MongoDBConfig extends AbstractMongoClientConfiguration {
    private final MongoDBProperties mongoDBProperties;

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(mongoDBProperties.getUri());
    }
    
    @Bean
    public MongoTemplate mongoTemplate(MongoDatabaseFactory databaseFactory, MappingMongoConverter converter) {
    	// remove _class
    	converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return new MongoTemplate(databaseFactory, converter);
    }

    @Override
    protected String getDatabaseName() {
        return mongoDBProperties.getDatabase();
    }
    
}
