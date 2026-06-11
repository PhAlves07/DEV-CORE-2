package com.agrestesoluciona.backend.dto;

import com.agrestesoluciona.backend.model.RequestStatus;

import java.time.LocalDateTime;

public class ProviderServiceRequestDTO {

    private Long id;

    private String clientName;

    private String description;

    private String address;

    private RequestStatus status;

    private LocalDateTime createdAt;

    public ProviderServiceRequestDTO(
            Long id,
            String clientName,
            String description,
            String address,
            RequestStatus status,
            LocalDateTime createdAt) {

        this.id = id;
        this.clientName = clientName;
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
