package com.acko.tool.enums;

import com.acko.tool.entity.AssessmentBusinessEntity;
import com.acko.tool.entity.AssessmentTask;
import com.acko.tool.entity.ProposalBusinessEntity;
import com.acko.tool.entity.ProposalTask;

public enum TaskType {
    PROPOSAL(ProposalBusinessEntity.class),
    ASSESSMENT(AssessmentBusinessEntity.class);

    private final Class<?> taskClass;

    TaskType(Class<?> taskClass) {
        this.taskClass = taskClass;
    }

    public Class<?> getTaskClass() {
        return taskClass;
    }
}

