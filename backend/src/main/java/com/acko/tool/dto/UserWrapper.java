package com.acko.tool.dto;

import com.acko.tool.entity.User;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserWrapper {

	private Claims tokenInfo;
	private User userInfo;
}
