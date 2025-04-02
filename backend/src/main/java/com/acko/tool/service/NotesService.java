package com.acko.tool.service;


import com.acko.tool.entity.notes.Notes;
import com.acko.tool.entity.notes.NotesData;
import com.acko.tool.entity.notes.NotesRequest;
import com.acko.tool.repository.mongo.NotesRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
@Log4j2
public class NotesService {
    private final NotesRepository notesRepository;
    public void addNotes(NotesRequest notesRequest) {
        try {
            String entityId = notesRequest.getEntityId();
            Notes notesTable = getNotesById(entityId);
            NotesData notesData = NotesData.builder()
                .note(notesRequest.getNote())
                .noteBy(notesRequest.getNoteBy())
                .date(new Date())
                .build();
            notesTable.getNotes().add(notesData);
            if (Objects.isNull(notesTable.getTag())) {
                notesTable.setTag(notesRequest.getTag());
            }

            notesRepository.save(notesTable);
        }catch (Exception e){
            log.error("Error occurred while saving new note to database",e);
            throw new RuntimeException("Error occurred while saving new note to database",e);
        }
    }

    public Notes getNotesById(String entityId) {
        if(Objects.isNull(entityId)) {
            throw new RuntimeException("Id cannot be null");
        }
        Optional<Notes> notesTable= notesRepository.findById(entityId);
        return notesTable.orElse(Notes.builder()
            .entityId(entityId)
            .notes(new ArrayList<>())
            .createdDate(new Date())
            .build());
    }
}