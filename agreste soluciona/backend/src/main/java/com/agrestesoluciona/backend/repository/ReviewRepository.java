package com.agrestesoluciona.backend.repository;

import com.agrestesoluciona.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProviderIdOrderByCreatedAtDesc(Long providerId);

    Long countByProviderId(Long providerId);

    @Query("select avg(r.rating) from Review r where r.provider.id = :providerId")
    Double findAverageRatingByProviderId(
            @Param("providerId") Long providerId);
}
