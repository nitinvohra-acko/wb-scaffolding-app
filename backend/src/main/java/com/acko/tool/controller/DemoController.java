package com.acko.tool.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DemoController {

	@GetMapping("/demo")
	public ResponseEntity<String> getAllTutorials() {
		return ResponseEntity.ok("sab changa hai");
	}

}
