package com.agrestesoluciona.backend.dto;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;


public class AdminReviewDTO {

    private Long id;

    private String clientName;

    private String providerName;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;

    public AdminReviewDTO(
            Long id,
            String clientName,
            String providerName,
            Integer rating,
            String comment,
            LocalDateTime createdAt) {

        this.id = id;
        this.clientName = clientName;
        this.providerName = providerName;
        this.rating = rating;
        this.comment = comment;
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
