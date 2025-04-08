package com.acko.tool.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserGroupDTO {

	@NotBlank(message = "groupName cannot be blank")
	private String groupName;
	private List<String> allowedRoles;
}
