package com.acko.tool.utils;

import java.util.Objects;

import org.springframework.stereotype.Component;

import com.acko.tool.entity.Task;
import com.acko.tool.entity.User;
import com.acko.tool.entity.search.ESTask;
import com.acko.tool.entity.search.user.ESUser;
import com.acko.tool.repository.es.ESTaskRepository;
import com.acko.tool.repository.es.ESUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ESUtils {
    private final ObjectMapper objectMapper;
    private final ESTaskRepository esTaskRepository;
    private final ESUserRepository esUserRepository;

	public ESTask putTaskInES(Task<?> mongoTask, ESTask esTask) {
		// put the task in ES
		if (Objects.nonNull(mongoTask)) {
			esTask = objectMapper.convertValue(mongoTask, ESTask.class);
		}
		return esTaskRepository.save(esTask);
	}

	public ESUser putUserInES(User mongoUser, ESUser esUser) {
		// put the user in ES
		if (Objects.nonNull(mongoUser)) {
			esUser = objectMapper.convertValue(mongoUser, ESUser.class);
		}
		return esUserRepository.save(esUser);
	}
}
