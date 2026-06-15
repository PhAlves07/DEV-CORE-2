package com.agrestesoluciona.backend.dto;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;

public class MessageResponseDTO {

    private Long id;

    private Long conversationId;

    private Long senderId;

    private String senderName;

    private String content;

    private LocalDateTime createdAt;

    public MessageResponseDTO(
            Long id,
            Long conversationId,
            Long senderId,
            String senderName,
            String content,
            LocalDateTime createdAt) {

        this.id = id;
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.senderName = senderName;
        this.content = content;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public String getSenderName() {
        return senderName;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
