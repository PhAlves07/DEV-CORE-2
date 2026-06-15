package com.agrestesoluciona.backend.controller;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.AdminProviderDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.AdminReviewDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.AdminServiceRequestDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.AdminUserDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.AdminService;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.UserService;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.CrossOrigin;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.GetMapping;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RequestHeader;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RequestMapping;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RestController;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;

// Transforma a classe em controller REST, retornando dados JSON para o frontend.
@RestController
// Define o caminho base dos endpoints deste controller.
@RequestMapping("/admin")
@CrossOrigin("*")

public class AdminController {

    private final AdminService adminService;
    private final UserService userService;

    public AdminController(
            AdminService adminService,
            UserService userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    
    @GetMapping("/providers/pending")
    
    public List<AdminProviderDTO> getPendingProviders(
            // Recebe um valor enviado no cabecalho HTTP, como o id do usuario autenticado.
            @RequestHeader("X-User-Id") Long userId) {

        userService.validateAdmin(userId);

        return adminService.findPendingProviders();
    }

   
    @GetMapping("/providers")
    
    public List<AdminProviderDTO> getProviders(
            // Recebe um valor enviado no cabecalho HTTP, como o id do usuario autenticado.
            @RequestHeader("X-User-Id") Long userId) {

        userService.validateAdmin(userId);

        return adminService.findProviders();
    }

   
    @GetMapping("/users")
   
    public List<AdminUserDTO> getUsers(
            // Recebe um valor enviado no cabecalho HTTP, como o id do usuario autenticado.
            @RequestHeader("X-User-Id") Long userId) {

        userService.validateAdmin(userId);

        return adminService.findUsers();
    }

   
    @GetMapping("/reviews")
   
    public List<AdminReviewDTO> getReviews(
            // Recebe um valor enviado no cabecalho HTTP, como o id do usuario autenticado.
            @RequestHeader("X-User-Id") Long userId) {

        userService.validateAdmin(userId);

        return adminService.findReviews();
    }


    @GetMapping("/service-requests")
    
    public List<AdminServiceRequestDTO> getServiceRequests(
            // Recebe um valor enviado no cabecalho HTTP, como o id do usuario autenticado.
            @RequestHeader("X-User-Id") Long userId) {

        userService.validateAdmin(userId);

        return adminService.findServiceRequests();
    }
}
