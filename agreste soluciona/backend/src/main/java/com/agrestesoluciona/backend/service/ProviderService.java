package com.agrestesoluciona.backend.service;

import com.agrestesoluciona.backend.model.Provider;
import com.agrestesoluciona.backend.repository.ProviderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrestesoluciona.backend.model.User;
import com.agrestesoluciona.backend.repository.UserRepository;

import java.util.List;

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

}