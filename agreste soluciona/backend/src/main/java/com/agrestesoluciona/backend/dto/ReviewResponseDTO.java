package com.agrestesoluciona.backend.dto;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;


public class ReviewResponseDTO {

    private Long id;
    private Long serviceRequestId;
    private Long clientId;
    private String clientName;
    private Long providerId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewResponseDTO(
            Long id,
            Long serviceRequestId,
            Long clientId,
            String clientName,
            Long providerId,
            Integer rating,
            String comment,
            LocalDateTime createdAt) {

        this.id = id;
        this.serviceRequestId = serviceRequestId;
        this.clientId = clientId;
        this.clientName = clientName;
        this.providerId = providerId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    
    public Long getId() {
        return id;
    }

    
    public Long getServiceRequestId() {
        return serviceRequestId;
    }

    
    public Long getClientId() {
        return clientId;
    }

    
    public String getClientName() {
        return clientName;
    }

    
    public Long getProviderId() {
        return providerId;
    }

    
    public Integer getRating() {
        return rating;
    }

    
    public String getComment() {
        return comment;
    }

    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
