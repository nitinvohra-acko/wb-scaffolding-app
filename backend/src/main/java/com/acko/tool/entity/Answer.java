//package com.acko.tool.entity;
//
//import lombok.Data;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//@Document(collection = "Answer")
//@Data
//public class Answer {
//    @Id
//    private String id;
//
//    private String journey;
//    private String referenceId;
//    private String source;
//    private String questionId;
//    private String updatedBy;
//    private String userId;
//
//    // Storing answer and answerId as Object so it can be either a String or a list.
//    private Object answer;
//    private Object answerId;
//}