package com.agrestesoluciona.backend.repository;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.ServiceRequest;
// Spring Data JPA gera operacoes de banco como salvar, listar e buscar por id.
import org.springframework.data.jpa.repository.JpaRepository;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;


public interface ServiceRequestRepository
        extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByClientIdOrderByCreatedAtDesc(Long clientId);

    List<ServiceRequest> findByProviderIdOrderByCreatedAtDesc(Long providerId);

    List<ServiceRequest> findAllByOrderByCreatedAtDesc();
}
