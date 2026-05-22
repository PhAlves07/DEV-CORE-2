package com.agrestesoluciona.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrestesoluciona.backend.model.User;
import com.agrestesoluciona.backend.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User saveUser(User user) {

        Optional<User> userExists = userRepository.findByEmail(user.getEmail());

        if (userExists.isPresent()) {

            throw new RuntimeException(
                    "Email já cadastrado");
        }

        String encryptedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encryptedPassword);

        return userRepository.save(user);
    }

    public User login(String email, String password) {

        Optional<User> userExists = userRepository.findByEmail(email);

        if (userExists.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        User user = userExists.get();

        boolean passwordMatch = passwordEncoder.matches(
                password,
                user.getPassword());

        if (!passwordMatch) {
            throw new RuntimeException("Senha incorreta");
        }

        return user;
    }
}