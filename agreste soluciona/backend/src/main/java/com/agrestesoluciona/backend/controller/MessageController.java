package com.agrestesoluciona.backend.controller;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.CreateMessageDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.MessageResponseDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.MessageService;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.CrossOrigin;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.GetMapping;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.PathVariable;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.PostMapping;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RequestBody;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RequestMapping;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RestController;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;

// Transforma a classe em controller REST, retornando dados JSON para o frontend.
@RestController
// Define o caminho base dos endpoints deste controller.
@RequestMapping
@CrossOrigin("*")

public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    
    @GetMapping({"/messages/{conversationId}", "/messages/{conversationId}/"})
    
    public List<MessageResponseDTO> getMessages(
            // Recebe um valor que vem no proprio caminho da URL.
            @PathVariable Long conversationId) {

        return messageService.findByConversation(conversationId);
    }

    
    @PostMapping({"/messages", "/messages/"})
    
    public MessageResponseDTO createMessage(
            // Recebe no Java o JSON enviado pelo frontend no corpo da requisicao.
            @RequestBody CreateMessageDTO dto) {

        return messageService.create(dto);
    }
}
