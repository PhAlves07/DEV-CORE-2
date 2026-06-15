package com.agrestesoluciona.backend.service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.CreateMessageDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.MessageResponseDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Conversation;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Message;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.RequestStatus;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.User;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.ConversationRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.MessageRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.UserRepository;
// Marca a classe como service, camada onde ficam regras de negocio.
import org.springframework.stereotype.Service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;
// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;

// Marca a classe como camada de servico, onde ficam regras de negocio.
@Service

public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    public MessageService(
            MessageRepository messageRepository,
            ConversationRepository conversationRepository,
            UserRepository userRepository) {

        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }

    
    public List<MessageResponseDTO> findByConversation(Long conversationId) {

        Conversation conversation = findAcceptedConversation(conversationId);

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId())
                .stream()
                .map(this::toDTO)
                .toList();
    }

    
    public MessageResponseDTO create(CreateMessageDTO dto) {

        if (dto.getContent() == null || dto.getContent().trim().isEmpty()) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Mensagem nao pode ser vazia");
        }

        Conversation conversation = findAcceptedConversation(dto.getConversationId());

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        User sender = userRepository.findById(dto.getSenderId())
                .orElseThrow(() -> new RuntimeException("Remetente nao encontrado"));

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setContent(dto.getContent().trim());
        message.setCreatedAt(LocalDateTime.now());

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return toDTO(messageRepository.save(message));
    }

    private Conversation findAcceptedConversation(Long conversationId) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversa nao encontrada"));

        if (conversation.getServiceRequest().getStatus() != RequestStatus.ACCEPTED) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Chat disponivel somente para solicitacoes aceitas");
        }

        return conversation;
    }

    private MessageResponseDTO toDTO(Message message) {

        return new MessageResponseDTO(
                message.getId(),
                message.getConversation().getId(),
                message.getSender().getId(),
                message.getSender().getName(),
                message.getContent(),
                message.getCreatedAt());
    }
}
