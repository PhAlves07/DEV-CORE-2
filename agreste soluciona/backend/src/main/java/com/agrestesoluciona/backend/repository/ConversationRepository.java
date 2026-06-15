package com.agrestesoluciona.backend.repository;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Conversation;
// Spring Data JPA gera operacoes de banco como salvar, listar e buscar por id.
import org.springframework.data.jpa.repository.JpaRepository;

// Optional representa um valor que pode existir ou nao, evitando null direto.
import java.util.Optional;


public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    Optional<Conversation> findByServiceRequestId(Long serviceRequestId);
}
