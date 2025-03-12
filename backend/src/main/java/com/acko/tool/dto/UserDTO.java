package com.acko.tool.dto;

import java.util.Map;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	@NotBlank(message = "Username cannot be blank")
	private String username;
	
	@Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
	private String password;
	
	@Email(message = "Email should be valid")
	private String email;
	private String firstName;
	private String lastName;
	private String group;
	private boolean active;
	private Map<String, Object> customAttributes;
}
