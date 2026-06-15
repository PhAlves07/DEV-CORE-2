package com.agrestesoluciona.backend.dto;


public class ProviderReviewDTO {

    private Integer rating;
    private String comment;
    private String clientName;

    public ProviderReviewDTO(
            Integer rating,
            String comment,
            String clientName) {

        this.rating = rating;
        this.comment = comment;
        this.clientName = clientName;
    }

    
    public Integer getRating() {
        return rating;
    }

    
    public String getComment() {
        return comment;
    }

    
    public String getClientName() {
        return clientName;
    }
}
