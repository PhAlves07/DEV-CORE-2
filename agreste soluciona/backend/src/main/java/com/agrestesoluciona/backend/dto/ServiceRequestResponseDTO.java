package com.agrestesoluciona.backend.dto;

import com.agrestesoluciona.backend.model.RequestStatus;

import java.time.LocalDateTime;

public class ServiceRequestResponseDTO {

    private Long id;

    private String clientName;

    private String providerName;

    private String profession;

    private String description;

    private String address;

    private RequestStatus status;

    private LocalDateTime createdAt;

    public ServiceRequestResponseDTO(
            Long id,
            String clientName,
            String providerName,
            String profession,
            String description,
            String address,
            RequestStatus status,
            LocalDateTime createdAt) {

        this.id = id;
        this.clientName = clientName;
        this.providerName = providerName;
        this.profession = profession;
        this.description = description;
        this.address = address;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getClientName() {
        return clientName;
    }

    public String getProviderName() {
        return providerName;
    }

    public String getProfession() {
        return profession;
    }

    public String getDescription() {
        return description;
    }

    public String getAddress() {
        return address;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}