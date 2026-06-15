package com.agrestesoluciona.backend.controller;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.User;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.UserService;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.beans.factory.annotation.Autowired;
// Classe HTTP usada para controlar status e corpo das respostas da API.
import org.springframework.http.ResponseEntity;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.*;

// Transforma a classe em controller REST, retornando dados JSON para o frontend.
@RestController
// Define o caminho base dos endpoints deste controller.
@RequestMapping("/users")
@CrossOrigin("*")

public class UserController {

    // Pede ao Spring para injetar automaticamente uma dependencia.
    @Autowired
    private UserService userService;

    // TESTE DE CONEXÃO
 
    @GetMapping("/test")
   
    public String test() {
        return "API funcionando";
    }

    // CADASTRO

    @PostMapping({"/register", "/register/"})
    public ResponseEntity<?> registerUser(
            
            @RequestBody User user) {

        userService.saveUser(user);

        return ResponseEntity.ok("Usuário cadastrado!");
    }

    // LOGIN
  
    @PostMapping({"/login", "/login/"})
    public ResponseEntity<?> login(
          
            @RequestBody User user) {
            
        User loggedUser = userService.login(
                user.getEmail(),
                user.getPassword());

        return ResponseEntity.ok(loggedUser);
    }

}
