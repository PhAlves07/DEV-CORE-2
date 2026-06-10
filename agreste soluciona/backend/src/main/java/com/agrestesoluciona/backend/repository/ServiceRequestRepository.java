package com.agrestesoluciona.backend.repository;

import com.agrestesoluciona.backend.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRequestRepository
        extends JpaRepository<ServiceRequest, Long> {
}