package com.agrestesoluciona.backend.dto;

import com.agrestesoluciona.backend.model.RequestStatus;

import java.time.LocalDateTime;

public class ClientServiceRequestDTO {

    private Long id;

    private String providerName;

    private String profession;

    private RequestStatus status;

    private LocalDateTime createdAt;

    public ClientServiceRequestDTO(
            Long id,
            String providerName,
            String profession,
            RequestStatus status,
            LocalDateTime createdAt) {

        this.id = id;
        this.providerName = providerName;
        this.profession = profession;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getProviderName() {
        return providerName;
    }

    public String getProfession() {
        return profession;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
