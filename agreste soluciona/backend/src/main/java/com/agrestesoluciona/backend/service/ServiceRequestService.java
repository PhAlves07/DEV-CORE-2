package com.agrestesoluciona.backend.service;

import com.agrestesoluciona.backend.dto.ClientServiceRequestDTO;
import com.agrestesoluciona.backend.dto.CreateServiceRequestDTO;
import com.agrestesoluciona.backend.dto.ProviderServiceRequestDTO;
import com.agrestesoluciona.backend.dto.ServiceRequestResponseDTO;
import com.agrestesoluciona.backend.model.*;
import com.agrestesoluciona.backend.repository.*;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

        return toResponseDTO(saved);
    }

    public List<ClientServiceRequestDTO> findByClient(
            Long clientId) {

        return serviceRequestRepository
                .findByClientIdOrderByCreatedAtDesc(clientId)
                .stream()
                .map(this::toClientDTO)
                .toList();
    }

    public List<ProviderServiceRequestDTO> findByProvider(
            Long providerId) {

        return serviceRequestRepository
                .findByProviderIdOrderByCreatedAtDesc(providerId)
                .stream()
                .map(this::toProviderDTO)
                .toList();
    }

    public ProviderServiceRequestDTO acceptRequest(
            Long requestId) {

        ServiceRequest request = serviceRequestRepository
                .findById(requestId)
                .orElseThrow(() -> new RuntimeException("Solicitacao nao encontrada"));

        request.setStatus(RequestStatus.ACCEPTED);

        ServiceRequest saved = serviceRequestRepository.save(request);

        return toProviderDTO(saved);
    }

    public ProviderServiceRequestDTO rejectRequest(
            Long requestId) {

        ServiceRequest request = serviceRequestRepository
                .findById(requestId)
                .orElseThrow(() -> new RuntimeException("Solicitacao nao encontrada"));

        request.setStatus(RequestStatus.REJECTED);

        ServiceRequest saved = serviceRequestRepository.save(request);

        return toProviderDTO(saved);
    }

    private ServiceRequestResponseDTO toResponseDTO(
            ServiceRequest saved) {

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

    private ClientServiceRequestDTO toClientDTO(
            ServiceRequest request) {

        return new ClientServiceRequestDTO(
                request.getId(),
                request.getProvider().getUser().getName(),
                request.getProvider().getProfession(),
                request.getStatus(),
                request.getCreatedAt());
    }

    private ProviderServiceRequestDTO toProviderDTO(
            ServiceRequest request) {

        return new ProviderServiceRequestDTO(
                request.getId(),
                request.getClient().getName(),
                request.getDescription(),
                request.getAddress(),
                request.getStatus(),
                request.getCreatedAt());
    }
}
