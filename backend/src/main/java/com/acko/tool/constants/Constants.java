package com.acko.tool.constants;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Constants {
    public static final Integer MAX_AGGREGATION_BUCKET_SIZE = 200;
    public static final String ASSESSMENT_CONFIG = "/assessment-questions/config";
    public static final String ADD_QUESTION = "/addQuestions";
    public static final String ANSWERS = "/answers";
    public static final String GETANSWERS = "/getAnswers";
}