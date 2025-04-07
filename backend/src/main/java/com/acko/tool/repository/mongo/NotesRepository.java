package com.acko.tool.repository.mongo;

import com.acko.tool.entity.notes.Notes;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotesRepository extends MongoRepository<Notes, String> {

}