package com.acko.tool.entity;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("User")
@AllArgsConstructor
@Builder(toBuilder = true)
@Data
@NoArgsConstructor
public class User {

	@Id
	private String id;
	private String username;
	private String email;
	private String firstName;
	private String lastName;
	private String group;
	private List<String> roles;
	private boolean active;
	private Map<String, Object> customAttributes;
	
	@CreatedDate
	private Date createdDate;

	@LastModifiedDate
	private Date updatedDate;
	
}
