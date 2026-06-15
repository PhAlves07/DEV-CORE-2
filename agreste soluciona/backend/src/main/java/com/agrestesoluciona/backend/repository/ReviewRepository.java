package com.agrestesoluciona.backend.repository;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Review;
// Spring Data JPA gera operacoes de banco como salvar, listar e buscar por id.
import org.springframework.data.jpa.repository.JpaRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.data.jpa.repository.Query;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.data.repository.query.Param;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;


public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProviderIdOrderByCreatedAtDesc(Long providerId);

    Long countByProviderId(Long providerId);

    @Query("select avg(r.rating) from Review r where r.provider.id = :providerId")
    Double findAverageRatingByProviderId(
            @Param("providerId") Long providerId);
}
