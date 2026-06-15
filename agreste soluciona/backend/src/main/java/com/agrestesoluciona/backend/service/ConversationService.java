package com.agrestesoluciona.backend.service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ConversationResponseDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Conversation;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.RequestStatus;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.ServiceRequest;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.ConversationRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.ServiceRequestRepository;
// Marca a classe como service, camada onde ficam regras de negocio.
import org.springframework.stereotype.Service;

// Marca a classe como camada de servico, onde ficam regras de negocio.
@Service

public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    public ConversationService(
            ConversationRepository conversationRepository,
            ServiceRequestRepository serviceRequestRepository) {

        this.conversationRepository = conversationRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    
    public ConversationResponseDTO getOrCreateByServiceRequest(Long serviceRequestId) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        ServiceRequest serviceRequest = serviceRequestRepository.findById(serviceRequestId)
                .orElseThrow(() -> new RuntimeException("Solicitacao nao encontrada"));

        if (serviceRequest.getStatus() != RequestStatus.ACCEPTED) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Chat disponivel somente para solicitacoes aceitas");
        }

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Conversation conversation = conversationRepository.findByServiceRequestId(serviceRequestId)
                .orElseGet(() -> {
                    Conversation created = new Conversation();
                    created.setServiceRequest(serviceRequest);
                    // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
                    return conversationRepository.save(created);
                });

        return toDTO(conversation);
    }

    private ConversationResponseDTO toDTO(Conversation conversation) {

        return new ConversationResponseDTO(
                conversation.getId(),
                conversation.getServiceRequest().getId());
    }
}
