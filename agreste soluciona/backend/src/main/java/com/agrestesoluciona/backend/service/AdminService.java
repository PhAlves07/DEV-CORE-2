package com.agrestesoluciona.backend.service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.AdminProviderDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.AdminReviewDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.AdminServiceRequestDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.AdminUserDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Provider;
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

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;

// Marca a classe como camada de servico, onde ficam regras de negocio.
@Service

public class AdminService {

    private final ProviderRepository providerRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    public AdminService(
            ProviderRepository providerRepository,
            UserRepository userRepository,
            ReviewRepository reviewRepository,
            ServiceRequestRepository serviceRequestRepository) {

        this.providerRepository = providerRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    
    public List<AdminProviderDTO> findPendingProviders() {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.findByApprovedFalse()
                .stream()
                .map(this::toProviderDTO)
                .toList();
    }

    
    public List<AdminProviderDTO> findProviders() {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.findAll()
                .stream()
                .map(this::toProviderDTO)
                .toList();
    }

    
    public List<AdminUserDTO> findUsers() {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return userRepository.findAll()
                .stream()
                .map(this::toUserDTO)
                .toList();
    }

    
    public List<AdminReviewDTO> findReviews() {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return reviewRepository.findAll()
                .stream()
                .map(this::toReviewDTO)
                .toList();
    }

    
    public List<AdminServiceRequestDTO> findServiceRequests() {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return serviceRequestRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toServiceRequestDTO)
                .toList();
    }

    private AdminProviderDTO toProviderDTO(Provider provider) {

        return new AdminProviderDTO(
                provider.getId(),
                provider.getUser().getName(),
                provider.getProfession(),
                provider.getCity(),
                provider.getApproved());
    }

    private AdminUserDTO toUserDTO(User user) {

        return new AdminUserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone());
    }

    private AdminReviewDTO toReviewDTO(Review review) {

        return new AdminReviewDTO(
                review.getId(),
                review.getClient().getName(),
                review.getProvider().getUser().getName(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt());
    }

    private AdminServiceRequestDTO toServiceRequestDTO(ServiceRequest serviceRequest) {

        return new AdminServiceRequestDTO(
                serviceRequest.getId(),
                serviceRequest.getClient().getName(),
                serviceRequest.getProvider().getUser().getName(),
                serviceRequest.getStatus(),
                serviceRequest.getCreatedAt());
    }
}
