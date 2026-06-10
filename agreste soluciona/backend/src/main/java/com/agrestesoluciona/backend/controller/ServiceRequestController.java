package com.agrestesoluciona.backend.controller;

import com.agrestesoluciona.backend.dto.CreateServiceRequestDTO;
import com.agrestesoluciona.backend.dto.ServiceRequestResponseDTO;
import com.agrestesoluciona.backend.model.ServiceRequest;
import com.agrestesoluciona.backend.service.ServiceRequestService;

import org.springframework.web.bind.annotation.*;

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
}