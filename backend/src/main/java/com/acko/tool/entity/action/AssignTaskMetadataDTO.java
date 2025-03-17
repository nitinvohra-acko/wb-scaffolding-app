package com.acko.tool.entity.action;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AssignTaskMetadataDTO {
    private List<AssignToDTO> assignToList;
    private List<UserLabelDTO> userList;
    private List<AssignmentStrategyDTO> assignmentStrategyList;
    private List<String> userPropertyList;
}
