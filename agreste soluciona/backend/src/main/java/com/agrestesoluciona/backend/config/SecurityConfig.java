package com.agrestesoluciona.backend.config;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.context.annotation.Bean;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.context.annotation.Configuration;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

// BCrypt criptografa e valida senhas sem armazenar texto puro.
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.security.web.SecurityFilterChain;

@Configuration

public class SecurityConfig {

    @Bean
    
    public BCryptPasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth
                    .anyRequest().permitAll()
            );

        return http.build();
    }
}