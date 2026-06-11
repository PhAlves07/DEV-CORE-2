package com.agrestesoluciona.backend.controller;

import com.agrestesoluciona.backend.dto.ClientServiceRequestDTO;
import com.agrestesoluciona.backend.dto.CreateServiceRequestDTO;
import com.agrestesoluciona.backend.dto.ProviderServiceRequestDTO;
import com.agrestesoluciona.backend.dto.ServiceRequestResponseDTO;
import com.agrestesoluciona.backend.service.ServiceRequestService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service-requests")
@CrossOrigin("*")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(
            ServiceRequestService serviceRequestService) {

        this.serviceRequestService = serviceRequestService;
    }

    @PostMapping
   public ServiceRequestResponseDTO createRequest(
            @RequestBody CreateServiceRequestDTO dto) {

        return serviceRequestService.createRequest(dto);
    }

    @GetMapping("/client/{userId}")
    public List<ClientServiceRequestDTO> getClientRequests(
            @PathVariable Long userId) {

        return serviceRequestService.findByClient(userId);
    }

    @GetMapping("/provider/{providerId}")
    public List<ProviderServiceRequestDTO> getProviderRequests(
            @PathVariable Long providerId) {

        return serviceRequestService.findByProvider(providerId);
    }

    @PutMapping("/{id}/accept")
    public ProviderServiceRequestDTO acceptRequest(
            @PathVariable Long id) {

        return serviceRequestService.acceptRequest(id);
    }

    @PutMapping("/{id}/reject")
    public ProviderServiceRequestDTO rejectRequest(
            @PathVariable Long id) {

        return serviceRequestService.rejectRequest(id);
    }
}
