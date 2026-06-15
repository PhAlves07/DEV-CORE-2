package com.agrestesoluciona.backend.controller;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ClientServiceRequestDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.CreateServiceRequestDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderServiceRequestDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ServiceRequestResponseDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.ServiceRequestService;

// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.*;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;

// Transforma a classe em controller REST, retornando dados JSON para o frontend.
@RestController
// Define o caminho base dos endpoints deste controller.
@RequestMapping("/service-requests")
@CrossOrigin("*")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(
            ServiceRequestService serviceRequestService) {

        this.serviceRequestService = serviceRequestService;
    }

    
    @PostMapping({"", "/"})
   
   public ServiceRequestResponseDTO createRequest(
            // Recebe no Java o JSON enviado pelo frontend no corpo da requisicao.
            @RequestBody CreateServiceRequestDTO dto) {

        return serviceRequestService.createRequest(dto);
    }

   
    @GetMapping("/client/{userId}")
   
    public List<ClientServiceRequestDTO> getClientRequests(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long userId) {

        return serviceRequestService.findByClient(userId);
    }

   
    @GetMapping("/provider/{providerId}")
    
    public List<ProviderServiceRequestDTO> getProviderRequests(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long providerId) {

        return serviceRequestService.findByProvider(providerId);
    }

    
    @PutMapping({"/{id}/accept", "/{id}/accept/"})
   
    public ProviderServiceRequestDTO acceptRequest(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long id) {

        return serviceRequestService.acceptRequest(id);
    }

    
    @PutMapping({"/{id}/reject", "/{id}/reject/"})
    
    public ProviderServiceRequestDTO rejectRequest(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long id) {

        return serviceRequestService.rejectRequest(id);
    }

   
    @PutMapping({"/{id}/complete", "/{id}/complete/"})
    
    public ServiceRequestResponseDTO completeRequest(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long id) {

        return serviceRequestService.completeRequest(id);
    }
}
