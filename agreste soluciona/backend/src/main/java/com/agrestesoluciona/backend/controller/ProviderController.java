package com.agrestesoluciona.backend.controller;

import com.agrestesoluciona.backend.model.Provider;
import com.agrestesoluciona.backend.service.ProviderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<Provider> getApprovedProviders() {

        return providerService.findApproved();
    }

    @GetMapping("/{id}")
    public Provider getProviderById(
            @PathVariable Long id) {

        return providerService.findById(id);
    }

    @PutMapping("/{id}/approve")
    public Provider approveProvider(
            @PathVariable Long id) {

        return providerService.approveProvider(id);
    }
}