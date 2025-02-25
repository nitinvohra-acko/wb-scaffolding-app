package com.acko.tool.utils;

import com.acko.tool.entity.Task;
import com.acko.tool.entity.search.ESTask;
import com.acko.tool.repository.ESTaskRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ESUtils {
    private final ObjectMapper objectMapper;
    private final ESTaskRepository esTaskRepository;

    public ESTask putTaskInES(Task mongoTask, ESTask esTask) {
        // put the task in ES
        if(Objects.nonNull(mongoTask)) {
            esTask = objectMapper.convertValue(mongoTask, ESTask.class);
        }
        return esTaskRepository.save(esTask);
    }
}
