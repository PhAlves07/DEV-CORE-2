package com.agrestesoluciona.backend.dto;


public class ProviderRatingDTO {

    private Double rating;
    private Long reviewsCount;

    public ProviderRatingDTO(Double rating, Long reviewsCount) {
        this.rating = rating;
        this.reviewsCount = reviewsCount;
    }

    
    public Double getRating() {
        return rating;
    }

    
    public Long getReviewsCount() {
        return reviewsCount;
    }
}
