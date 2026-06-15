package com.agrestesoluciona.backend.controller;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Provider;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.ProviderService;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.ReviewService;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.UserService;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.beans.factory.annotation.Autowired;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.*;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderResponseDTO;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderDetailsDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderReviewDTO;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;
// Map permite retornar pares chave-valor, comum em respostas simples da API.
import java.util.Map;

// Transforma a classe em controller REST, retornando dados JSON para o frontend.
@RestController
// Define o caminho base dos endpoints deste controller.
@RequestMapping("/providers")
@CrossOrigin("*")

public class ProviderController {

    // Pede ao Spring para injetar automaticamente uma dependencia.
    @Autowired
    private ProviderService providerService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    
    @PostMapping({"", "/"})
   
    public Map<String, Object> createProvider(
            // Recebe no Java o JSON enviado pelo frontend no corpo da requisicao.
            @RequestBody Provider provider) {

        Provider saved = providerService.save(provider);

        return Map.of(
                "id", saved.getId(),
                "message", "Cadastro de prestador enviado com sucesso");
    }

    
    @GetMapping
    
    public List<Provider> getAllProviders() {

        return providerService.findAll();
    }

    
    @GetMapping("/approved")
   
    public List<ProviderResponseDTO> getApprovedProviders() {

        return providerService.findApprovedDTO();
    }

   
    @GetMapping("/search")
    
    public List<ProviderResponseDTO> searchProviders(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String profession,
            @RequestParam(required = false) String city) {

        return providerService.searchApprovedDTO(name, profession, city);
    }

    
    @GetMapping("/user/{userId}")
    
    public ProviderDetailsDTO getProviderByUser(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long userId) {

        return providerService.findDetailsByUserId(userId);
    }

    
    @GetMapping("/{id}")
    
    public ProviderDetailsDTO getProviderDetails(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long id) {

        return providerService.findDetails(id);
    }

    
    @GetMapping("/{id}/reviews")
    
    public List<ProviderReviewDTO> getProviderReviews(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long id) {

        return reviewService.findByProvider(id);
    }

    
    @PutMapping({"/{id}/approve", "/{id}/approve/"})
    
    public Provider approveProvider(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long id,
            // Recebe um valor enviado no cabecalho HTTP, como o id do usuario autenticado.
            @RequestHeader("X-User-Id") Long userId) {

        userService.validateAdmin(userId);

        return providerService.approveProvider(id);
    }

   
    @PutMapping({"/{id}/reject", "/{id}/reject/"})
  
    public Provider rejectProvider(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long id,
            // Recebe um valor enviado no cabecalho HTTP, como o id do usuario autenticado.
            @RequestHeader("X-User-Id") Long userId) {

        userService.validateAdmin(userId);

        return providerService.rejectProvider(id);
    }
}
