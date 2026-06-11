package com.agrestesoluciona.backend.repository;

import com.agrestesoluciona.backend.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestRepository
        extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByClientIdOrderByCreatedAtDesc(Long clientId);

    List<ServiceRequest> findByProviderIdOrderByCreatedAtDesc(Long providerId);
}
