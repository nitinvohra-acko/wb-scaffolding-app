package com.acko.tool.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EligibleMember {
    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("name")
    private String name;
}
