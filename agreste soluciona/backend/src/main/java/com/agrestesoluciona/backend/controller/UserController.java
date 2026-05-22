package com.agrestesoluciona.backend.controller;

import com.agrestesoluciona.backend.model.User;
import com.agrestesoluciona.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // TESTE DE CONEXÃO
    @GetMapping("/test")
    public String test() {
        return "API funcionando";
    }

    // CADASTRO
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody User user) {

        userService.saveUser(user);

        return ResponseEntity.ok("Usuário cadastrado!");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User user) {
            
        User loggedUser = userService.login(
                user.getEmail(),
                user.getPassword());

        return ResponseEntity.ok(loggedUser);
    }

}