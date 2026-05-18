package com.agrestesoluciona.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agrestesoluciona.backend.dto.LoginRequest;
import com.agrestesoluciona.backend.dto.UserResponse;
import com.agrestesoluciona.backend.model.User;
import com.agrestesoluciona.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public UserResponse createUser(@Valid @RequestBody User user) {

        return new UserResponse(userService.saveUser(user));
    }

    @PostMapping("/login")
    public UserResponse login(@Valid @RequestBody LoginRequest loginRequest) {

        return new UserResponse(userService.login(loginRequest));
    }
}
