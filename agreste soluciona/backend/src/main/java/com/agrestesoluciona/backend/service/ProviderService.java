package com.agrestesoluciona.backend.service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.Provider;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.ProviderRepository;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.ReviewRepository;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.beans.factory.annotation.Autowired;
// Marca a classe como service, camada onde ficam regras de negocio.
import org.springframework.stereotype.Service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.User;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.UserRepository;

// List representa uma colecao ordenada de objetos retornados ou processados.
import java.util.List;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderResponseDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderDetailsDTO;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.dto.ProviderRatingDTO;

// Marca a classe como camada de servico, onde ficam regras de negocio.
@Service

public class ProviderService {

    // Pede ao Spring para injetar automaticamente uma dependencia.
    @Autowired
    private ProviderRepository providerRepository;

    // Pede ao Spring para injetar automaticamente uma dependencia.
    @Autowired
    private UserRepository userRepository;

    // Pede ao Spring para injetar automaticamente uma dependencia.
    @Autowired
    private ReviewRepository reviewRepository;

    
    public Provider save(Provider provider) {

        if (provider.getUser() == null) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Usuário é obrigatório");
        }

        Long userId = provider.getUser().getId();

        if (providerRepository.existsByUserId(userId)) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Usuario ja possui cadastro de prestador");
        }

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        provider.setUser(user);

        provider.setApproved(false);

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.save(provider);
    }

    
    public List<Provider> findAll() {
        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.findAll();
    }

    
    public List<Provider> findApproved() {
        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.findByApprovedTrue();
    }

    
    public Provider findById(Long id) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));
    }

    
    public Provider approveProvider(Long id) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));

        provider.setApproved(true);

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.save(provider);
    }

    
    public Provider rejectProvider(Long id) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestador nÃ£o encontrado"));

        provider.setApproved(false);

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.save(provider);
    }

    
    public List<ProviderResponseDTO> findApprovedDTO() {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return providerRepository.findByApprovedTrue()
                .stream()
                .map(this::toProviderResponseDTO)
                .toList();
    }

    
    public List<ProviderResponseDTO> searchApprovedDTO(
            String name,
            String profession,
            String city) {

        return providerRepository.searchApproved(
                        normalizeFilter(name),
                        normalizeFilter(profession),
                        normalizeFilter(city))
                .stream()
                .map(this::toProviderResponseDTO)
                .toList();
    }

    
    public ProviderDetailsDTO findDetails(Long id) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));

        ProviderRatingDTO ratingDTO = getProviderRating(provider.getId());

        return new ProviderDetailsDTO(
                provider.getId(),
                provider.getUser().getName(),
                provider.getUser().getPhone(),
                provider.getProfession(),
                provider.getCity(),
                provider.getExperienceYears(),
                provider.getAvailability(),
                provider.getDescription(),
                provider.getHasCertificate(),
                ratingDTO.getRating(),
                ratingDTO.getReviewsCount());
    }

    
    public ProviderDetailsDTO findDetailsByUserId(Long userId) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Provider provider = providerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Prestador nao encontrado para este usuario"));

        ProviderRatingDTO ratingDTO = getProviderRating(provider.getId());

        return new ProviderDetailsDTO(
                provider.getId(),
                provider.getUser().getName(),
                provider.getUser().getPhone(),
                provider.getProfession(),
                provider.getCity(),
                provider.getExperienceYears(),
                provider.getAvailability(),
                provider.getDescription(),
                provider.getHasCertificate(),
                ratingDTO.getRating(),
                ratingDTO.getReviewsCount());
    }

    
    public ProviderRatingDTO getProviderRating(Long providerId) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Double averageRating = reviewRepository.findAverageRatingByProviderId(providerId);
        Long reviewsCount = reviewRepository.countByProviderId(providerId);

        if (averageRating == null) {
            averageRating = 0.0;
        }

        double roundedRating = Math.round(averageRating * 10.0) / 10.0;

        return new ProviderRatingDTO(roundedRating, reviewsCount);
    }

    private ProviderResponseDTO toProviderResponseDTO(Provider provider) {

        ProviderRatingDTO ratingDTO = getProviderRating(provider.getId());

        return new ProviderResponseDTO(
                provider.getId(),
                provider.getUser().getName(),
                provider.getProfession(),
                provider.getCity(),
                provider.getExperienceYears(),
                provider.getAvailability(),
                ratingDTO.getRating(),
                ratingDTO.getReviewsCount());
    }

    private String normalizeFilter(String value) {

        if (value == null || value.trim().isEmpty()) {
            return null;
        }

        return value.trim();
    }

}
