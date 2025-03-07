package com.acko.tool.controller;
import java.security.Principal;

import org.keycloak.representations.AccessToken;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.authentication.AnonymousAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class ControllerHello{

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello");
    }

//    @GetMapping("/admin")
//    @PreAuthorize("hasRole('admin')")
//    public ResponseEntity<String> sayHelloToAdmin(Principal principal, 
//    		HttpServletRequest request,
//    		@AuthenticationPrincipal Jwt userDetails) {
//    	System.out.println(principal.getName());
//    	System.out.println(request.getUserPrincipal());
//    	System.out.println(userDetails.getClaim(AccessToken.PREFERRED_USERNAME).toString());
//    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//    	
//    	//UserRepresentation
//    	
//    	Jwt jwt = (Jwt) authentication.getCredentials();
//        String email = (String) jwt.getClaims().get("email");
//        System.out.println(email);
//    	
//		if (!(authentication instanceof AnonymousAuthenticationToken)) {
//			String currentUserName = authentication.getName();
//			System.out.println(currentUserName);
//		}
//        return ResponseEntity.ok("Hello Admin");
//    }

    @GetMapping("/user")
    public ResponseEntity<String> sayHelloToUser() {
        return ResponseEntity.ok("Hello User");
    }
}