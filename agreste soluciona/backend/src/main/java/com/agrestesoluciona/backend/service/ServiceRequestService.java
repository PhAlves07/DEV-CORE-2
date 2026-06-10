package com.agrestesoluciona.backend.service;

import com.agrestesoluciona.backend.dto.CreateServiceRequestDTO;
import com.agrestesoluciona.backend.dto.ServiceRequestResponseDTO;
import com.agrestesoluciona.backend.model.*;
import com.agrestesoluciona.backend.repository.*;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;
    private final ProviderRepository providerRepository;

    public ServiceRequestService(
            ServiceRequestRepository serviceRequestRepository,
            UserRepository userRepository,
            ProviderRepository providerRepository) {

        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
        this.providerRepository = providerRepository;
    }

    public ServiceRequestResponseDTO createRequest(
            CreateServiceRequestDTO dto) {

        User client = userRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Provider provider = providerRepository.findById(dto.getProviderId())
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));

        ServiceRequest request = new ServiceRequest();

        request.setClient(client);
        request.setProvider(provider);
        request.setDescription(dto.getDescription());
        request.setAddress(dto.getAddress());

        request.setStatus(RequestStatus.PENDING);

        request.setCreatedAt(LocalDateTime.now());

        ServiceRequest saved = serviceRequestRepository.save(request);

        return new ServiceRequestResponseDTO(
                saved.getId(),
                saved.getClient().getName(),
                saved.getProvider().getUser().getName(),
                saved.getProvider().getProfession(),
                saved.getDescription(),
                saved.getAddress(),
                saved.getStatus(),
                saved.getCreatedAt());
    }
}