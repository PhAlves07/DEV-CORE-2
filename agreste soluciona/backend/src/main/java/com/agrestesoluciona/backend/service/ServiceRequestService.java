package com.agrestesoluciona.backend.service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ClientServiceRequestDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.CreateServiceRequestDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderServiceRequestDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ServiceRequestResponseDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.*;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.*;

// Marca a classe como service, camada onde ficam regras de negocio.
import org.springframework.stereotype.Service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;
// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;

// Marca a classe como camada de servico, onde ficam regras de negocio.
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

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        User client = userRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Provider provider = providerRepository.findById(dto.getProviderId())
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));

        ServiceRequest request = new ServiceRequest();

        request.setClient(client);
        request.setProvider(provider);
        request.setDescription(dto.getDescription());
        request.setAddress(dto.getAddress());

        request.setStatus(RequestStatus.PENDING);

        request.setCreatedAt(LocalDateTime.now());

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
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

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        ServiceRequest saved = serviceRequestRepository.save(request);

        return toProviderDTO(saved);
    }

    
    public ProviderServiceRequestDTO rejectRequest(
            Long requestId) {

        ServiceRequest request = serviceRequestRepository
                .findById(requestId)
                .orElseThrow(() -> new RuntimeException("Solicitacao nao encontrada"));

        request.setStatus(RequestStatus.REJECTED);

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        ServiceRequest saved = serviceRequestRepository.save(request);

        return toProviderDTO(saved);
    }

    
    public ServiceRequestResponseDTO completeRequest(
            Long requestId) {

        ServiceRequest request = serviceRequestRepository
                .findById(requestId)
                .orElseThrow(() -> new RuntimeException("Solicitacao nao encontrada"));

        if (request.getStatus() != RequestStatus.ACCEPTED) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Somente solicitacoes aceitas podem ser concluidas");
        }

        request.setStatus(RequestStatus.COMPLETED);

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        ServiceRequest saved = serviceRequestRepository.save(request);

        return toResponseDTO(saved);
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
                request.getProvider().getId(),
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
