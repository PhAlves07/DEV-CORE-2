package com.agrestesoluciona.backend.controller;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.CreateReviewDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ReviewResponseDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.ReviewService;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.CrossOrigin;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.PostMapping;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RequestBody;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RequestMapping;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RestController;

// Transforma a classe em controller REST, retornando dados JSON para o frontend.
@RestController
// Define o caminho base dos endpoints deste controller.
@RequestMapping("/reviews")
@CrossOrigin("*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    
    @PostMapping({"", "/"})
   
    public ReviewResponseDTO createReview(
            // Recebe no Java o JSON enviado pelo frontend no corpo da requisicao.
            @RequestBody CreateReviewDTO dto) {

        return reviewService.createReview(dto);
    }
}
