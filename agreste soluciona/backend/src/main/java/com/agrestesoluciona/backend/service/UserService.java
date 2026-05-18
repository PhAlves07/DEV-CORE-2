package com.agrestesoluciona.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrestesoluciona.backend.model.User;
import com.agrestesoluciona.backend.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import com.agrestesoluciona.backend.dto.LoginRequest;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User saveUser(User user) {

        user.setEmail(normalizeEmail(user.getEmail()));

        Optional<User> userExists = userRepository.findByEmail(user.getEmail());

        if (userExists.isPresent()) {

            throw new RuntimeException(
                    "Email já cadastrado");
        }

        String encryptedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encryptedPassword);

        return userRepository.save(user);
    }

    public User login(LoginRequest loginRequest) {

        String email = normalizeEmail(loginRequest.getEmail());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(
                        "Email ou senha inválidos"));

        boolean passwordMatches = passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException(
                    "Email ou senha inválidos");
        }

        return user;
    }

    private String normalizeEmail(String email) {

        return email == null
                ? null
                : email.trim().toLowerCase();
    }
}
