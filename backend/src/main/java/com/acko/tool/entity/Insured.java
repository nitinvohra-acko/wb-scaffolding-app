package com.acko.tool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Insured {
    private Parameters parameters;

    private String insuredId;

    private String insuredNumber;

    private String createdOn;

    private String updatedOn;
}