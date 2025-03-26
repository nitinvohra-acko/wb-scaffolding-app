package com.acko.tool.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class AssessmentBusinessEntity {

	private String assessmentId;
	private String assessmentStatus;
}
