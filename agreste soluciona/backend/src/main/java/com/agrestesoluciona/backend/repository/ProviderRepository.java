package com.agrestesoluciona.backend.repository;

import com.agrestesoluciona.backend.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {

    List<Provider> findByApprovedTrue();

    Optional<Provider> findByUserId(Long userId);

}
