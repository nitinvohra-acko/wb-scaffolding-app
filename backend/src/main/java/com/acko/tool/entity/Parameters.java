package com.acko.tool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
public class Parameters {
    private Parameter<String> id;
    private Parameter<String> relationship;
    private Parameter<String> role;
    private Parameter<String> relation;

//    @JsonProperty("user_id")
    private Parameter<String> userId;
    private Parameter<Integer> age;

//    @JsonProperty("marital_status")
    private Parameter<String> maritalStatus;
    private Parameter<String> email;
    private Parameter<String> pincode;
    private Parameter<String> dob;
    private Parameter<String> pan;
    private Parameter<String> name;
    private Parameter<String> gender;
    private Parameter<Integer> height;
    private Parameter<Integer> weight;
}