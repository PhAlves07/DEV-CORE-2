package com.agrestesoluciona.backend.dto;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.RequestStatus;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;

public class AdminServiceRequestDTO {

    private Long id;

    private String clientName;

    private String providerName;

    private RequestStatus status;

    private LocalDateTime createdAt;

    public AdminServiceRequestDTO(
            Long id,
            String clientName,
            String providerName,
            RequestStatus status,
            LocalDateTime createdAt) {

        this.id = id;
        this.clientName = clientName;
        this.providerName = providerName;
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

    
    public RequestStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
