package com.agrestesoluciona.backend.repository;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Message;
// Spring Data JPA gera operacoes de banco como salvar, listar e buscar por id.
import org.springframework.data.jpa.repository.JpaRepository;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;


public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);
}
