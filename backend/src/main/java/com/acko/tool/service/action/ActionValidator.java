package com.acko.tool.service.action;

import com.acko.tool.entity.action.ExecuteActionDTO;
import com.acko.tool.exception.BadRequestException;
import java.util.Objects;

public class ActionValidator {
    public void validateExecuteActionObject(ExecuteActionDTO executeActionObject) {
        if( Objects.isNull(executeActionObject)
            || Objects.isNull(executeActionObject.getReferenceTaskId())
            || Objects.isNull(executeActionObject.getAction())
            || Objects.isNull(executeActionObject.getAction().getActionProperties())
            || Objects.isNull(executeActionObject.getAction().getActionProperties().getAssignTaskProperties())
        ) throw new BadRequestException("Error while execution, no action properties found");
    }
    public void validateActionProperties(ExecuteActionDTO executeActionObject) {
        if(Objects.isNull(executeActionObject)
            || Objects.isNull(executeActionObject.getAction())
            || Objects.isNull(executeActionObject.getAction().getActionProperties())
            || Objects.isNull(executeActionObject.getAction().getActionProperties().getAssignTaskProperties())
        ) throw new BadRequestException("Error while execution, no action properties found");
    }
}
