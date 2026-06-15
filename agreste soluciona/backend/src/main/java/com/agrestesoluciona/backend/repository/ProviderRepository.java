package com.agrestesoluciona.backend.repository;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Provider;
// Spring Data JPA gera operacoes de banco como salvar, listar e buscar por id.
import org.springframework.data.jpa.repository.JpaRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.data.jpa.repository.Query;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.data.repository.query.Param;
// Marca a interface como repository, camada de acesso ao banco.
import org.springframework.stereotype.Repository;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;
// Optional representa um valor que pode existir ou nao, evitando null direto.
import java.util.Optional;

// Marca a interface como camada de acesso a dados.
@Repository

public interface ProviderRepository extends JpaRepository<Provider, Long> {

    List<Provider> findByApprovedTrue();

    List<Provider> findByApprovedFalse();

    Optional<Provider> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    @Query("""
            select p from Provider p
            where p.approved = true
            and (:name is null or lower(p.user.name) like lower(concat('%', :name, '%')))
            and (:profession is null or lower(p.profession) like lower(concat('%', :profession, '%')))
            and (:city is null or lower(p.city) like lower(concat('%', :city, '%')))
            """)
    List<Provider> searchApproved(
            @Param("name") String name,
            @Param("profession") String profession,
            @Param("city") String city);

}
