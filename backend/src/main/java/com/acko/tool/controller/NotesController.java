package com.acko.tool.controller;

import com.acko.tool.entity.notes.Notes;
import com.acko.tool.entity.notes.NotesRequest;
import com.acko.tool.service.NotesService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notes")
@AllArgsConstructor
public class NotesController {
    private final NotesService notesService;

    @PostMapping
    public ResponseEntity<String> addNotes(@Valid @RequestBody NotesRequest notesRequest) {
        notesService.addNotes(notesRequest);
        return ResponseEntity.ok("Added");
    }

    @GetMapping("{entityId}")
    public Notes getNotes(@NotBlank @PathVariable(name = "entityId", required = true) String entityId) throws IllegalArgumentException {
        return notesService.getNotesById(entityId);
    }
}
