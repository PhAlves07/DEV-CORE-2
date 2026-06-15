package com.agrestesoluciona.backend.dto;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.RequestStatus;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;

public class ClientServiceRequestDTO {

    private Long id;

    private String providerName;

    private Long providerId;

    private String profession;

    private RequestStatus status;

    private LocalDateTime createdAt;

    public ClientServiceRequestDTO(
            Long id,
            String providerName,
            Long providerId,
            String profession,
            RequestStatus status,
            LocalDateTime createdAt) {

        this.id = id;
        this.providerName = providerName;
        this.providerId = providerId;
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

    public Long getProviderId() {
        return providerId;
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
