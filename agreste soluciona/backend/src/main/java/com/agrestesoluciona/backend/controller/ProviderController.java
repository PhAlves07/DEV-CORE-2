package com.agrestesoluciona.backend.controller;

import com.agrestesoluciona.backend.model.Provider;
import com.agrestesoluciona.backend.service.ProviderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agrestesoluciona.backend.dto.ProviderResponseDTO;

import com.agrestesoluciona.backend.dto.ProviderDetailsDTO;

import java.util.List;

@RestController
@RequestMapping("/providers")
@CrossOrigin("*")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @PostMapping
    public Provider createProvider(
            @RequestBody Provider provider) {

        return providerService.save(provider);
    }

    @GetMapping
    public List<Provider> getAllProviders() {

        return providerService.findAll();
    }

    @GetMapping("/approved")
    public List<ProviderResponseDTO> getApprovedProviders() {

        return providerService.findApprovedDTO();
    }

    @GetMapping("/{id}")
    public ProviderDetailsDTO getProviderDetails(
            @PathVariable Long id) {

        return providerService.findDetails(id);
    }

    @PutMapping("/{id}/approve")
    public Provider approveProvider(
            @PathVariable Long id) {

        return providerService.approveProvider(id);
    }
}