package com.acko.tool.dto;

import java.util.Map;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {

	@NotBlank(message = "eventType cannot be blank")
	private String eventType;
	
	@NotBlank(message = "eventName cannot be blank")
	private String eventName;
	
	@NotBlank(message = "channel cannot be blank")
	private String channel;
	
	@NotBlank(message = "userId cannot be blank")
	private String userId;
	
	private Map<String, Object> properties;
}
