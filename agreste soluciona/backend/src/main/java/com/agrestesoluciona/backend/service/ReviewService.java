package com.agrestesoluciona.backend.service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.CreateReviewDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderReviewDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ReviewResponseDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Provider;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.RequestStatus;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Review;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.ServiceRequest;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.User;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.ProviderRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.ReviewRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.ServiceRequestRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.UserRepository;
// Marca a classe como service, camada onde ficam regras de negocio.
import org.springframework.stereotype.Service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;
// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;

// Marca a classe como camada de servico, onde ficam regras de negocio.
@Service

public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;
    private final ProviderRepository providerRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            ServiceRequestRepository serviceRequestRepository,
            UserRepository userRepository,
            ProviderRepository providerRepository) {

        this.reviewRepository = reviewRepository;
        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
        this.providerRepository = providerRepository;
    }

    
    public ReviewResponseDTO createReview(CreateReviewDTO dto) {

        if (dto.getRating() == null || dto.getRating() < 1 || dto.getRating() > 5) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("A nota deve ser entre 1 e 5");
        }

        ServiceRequest serviceRequest = serviceRequestRepository
                .findById(dto.getServiceRequestId())
                .orElseThrow(() -> new RuntimeException("Solicitacao nao encontrada"));

        if (serviceRequest.getStatus() != RequestStatus.COMPLETED) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Somente servicos concluidos podem ser avaliados");
        }

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        User client = userRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Cliente nao encontrado"));

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Provider provider = providerRepository.findById(dto.getProviderId())
                .orElseThrow(() -> new RuntimeException("Prestador nao encontrado"));

        if (!serviceRequest.getClient().getId().equals(client.getId())
                || !serviceRequest.getProvider().getId().equals(provider.getId())) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Avaliacao nao corresponde a solicitacao informada");
        }

        Review review = new Review();
        review.setServiceRequest(serviceRequest);
        review.setClient(client);
        review.setProvider(provider);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Review saved = reviewRepository.save(review);

        return toResponseDTO(saved);
    }

    
    public List<ProviderReviewDTO> findByProvider(Long providerId) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return reviewRepository.findByProviderIdOrderByCreatedAtDesc(providerId)
                .stream()
                .map(review -> new ProviderReviewDTO(
                        review.getRating(),
                        review.getComment(),
                        review.getClient().getName()))
                .toList();
    }

    private ReviewResponseDTO toResponseDTO(Review review) {

        return new ReviewResponseDTO(
                review.getId(),
                review.getServiceRequest().getId(),
                review.getClient().getId(),
                review.getClient().getName(),
                review.getProvider().getId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt());
    }
}
