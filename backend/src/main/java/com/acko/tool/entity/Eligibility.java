package com.acko.tool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
    public class Eligibility{
        @JsonProperty("male")
        private boolean male;
        @JsonProperty("female")
        private boolean female;
        //add more filters here
    }
