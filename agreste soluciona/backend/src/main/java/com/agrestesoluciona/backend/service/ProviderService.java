package com.agrestesoluciona.backend.service;

import com.agrestesoluciona.backend.model.Provider;
import com.agrestesoluciona.backend.repository.ProviderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrestesoluciona.backend.model.User;
import com.agrestesoluciona.backend.repository.UserRepository;

import java.util.List;

import com.agrestesoluciona.backend.dto.ProviderResponseDTO;
import com.agrestesoluciona.backend.dto.ProviderDetailsDTO;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private UserRepository userRepository;

    public Provider save(Provider provider) {

        if (provider.getUser() == null) {
            throw new RuntimeException("Usuário é obrigatório");
        }

        Long userId = provider.getUser().getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        provider.setUser(user);

        provider.setApproved(false);

        return providerRepository.save(provider);
    }

    public List<Provider> findAll() {
        return providerRepository.findAll();
    }

    public List<Provider> findApproved() {
        return providerRepository.findByApprovedTrue();
    }

    public Provider findById(Long id) {

        return providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));
    }

    public Provider approveProvider(Long id) {

        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));

        provider.setApproved(true);

        return providerRepository.save(provider);
    }

    public List<ProviderResponseDTO> findApprovedDTO() {

        return providerRepository.findByApprovedTrue()
                .stream()
                .map(provider -> new ProviderResponseDTO(
                        provider.getId(),
                        provider.getUser().getName(),
                        provider.getProfession(),
                        provider.getCity(),
                        provider.getExperienceYears(),
                        provider.getAvailability()))
                .toList();
    }

    public ProviderDetailsDTO findDetails(Long id) {

        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));

        return new ProviderDetailsDTO(
                provider.getId(),
                provider.getUser().getName(),
                provider.getUser().getPhone(),
                provider.getProfession(),
                provider.getCity(),
                provider.getExperienceYears(),
                provider.getAvailability(),
                provider.getDescription(),
                provider.getHasCertificate());
    }

    public ProviderDetailsDTO findDetailsByUserId(Long userId) {

        Provider provider = providerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Prestador nao encontrado para este usuario"));

        return new ProviderDetailsDTO(
                provider.getId(),
                provider.getUser().getName(),
                provider.getUser().getPhone(),
                provider.getProfession(),
                provider.getCity(),
                provider.getExperienceYears(),
                provider.getAvailability(),
                provider.getDescription(),
                provider.getHasCertificate());
    }

}
