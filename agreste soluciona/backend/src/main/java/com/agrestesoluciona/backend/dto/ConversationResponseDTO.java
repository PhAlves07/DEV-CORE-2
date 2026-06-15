package com.agrestesoluciona.backend.dto;

public class ConversationResponseDTO {

    private Long id;

    private Long serviceRequestId;

    public ConversationResponseDTO(Long id, Long serviceRequestId) {
        this.id = id;
        this.serviceRequestId = serviceRequestId;
    }

    public Long getId() {
        return id;
    }

    public Long getServiceRequestId() {
        return serviceRequestId;
    }
}
