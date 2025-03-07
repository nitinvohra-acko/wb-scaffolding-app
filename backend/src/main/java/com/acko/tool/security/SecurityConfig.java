package com.acko.tool.security;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    public static final String ADMIN = "admin";
//    public static final String USER = "user";
//    private final JwtConverter jwtConverter;
//    
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//			.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//			.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter)))
//        	.authorizeHttpRequests(authz ->
//                authz.requestMatchers(HttpMethod.GET, "/api/hello").authenticated()
//                        .requestMatchers(HttpMethod.GET, "/api/admin/**").hasRole(ADMIN)
////                        .requestMatchers(HttpMethod.GET, "/api/user/**").hasRole(USER)
//                        .requestMatchers(HttpMethod.GET, "/api/user/generate/token").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/admin-and-user/**").hasAnyRole(ADMIN,USER)
//                        .requestMatchers("/task").permitAll()
//                        .requestMatchers("/**").permitAll()
//                        .requestMatchers("/camunda/app/**", "/engine-rest/**").permitAll()  // Allow Camunda dashboard and API access
//                        .anyRequest().permitAll())
//    		.cors()
//    		.and()
//        	.csrf().disable();
//
//        return http.build();
//    }
//    
//    @Bean
//	public WebSecurityCustomizer webSecurityCustomizer() {
//
//		return (web) -> {
//			web.ignoring().requestMatchers(HttpMethod.POST, "/public/**", "/users");
//			web.ignoring().requestMatchers(HttpMethod.GET, "/public/**");
//			web.ignoring().requestMatchers(HttpMethod.DELETE, "/public/**");
//			web.ignoring().requestMatchers(HttpMethod.PUT, "/public/**");
//			web.ignoring().requestMatchers(HttpMethod.OPTIONS, "/**")
//						  .requestMatchers("/v3/api-docs/**", "/configuration/**", "/swagger-ui/**", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/api-docs/**");
//
//		};
//	}
//}