package com.agrestesoluciona.backend.model;

// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.Column;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.Entity;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.GeneratedValue;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.GenerationType;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.Id;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.JoinColumn;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.ManyToOne;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.Table;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;

// Indica que a classe vira uma tabela gerenciada pelo JPA.
@Entity
// Define detalhes da tabela no banco, como o nome usado pelo JPA.
@Table(name = "messages")

public class Message {

    // Marca o campo como chave primaria da tabela.
    @Id
    // Configura geracao automatica do id pelo banco.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relaciona muitos registros desta entidade a um registro de outra entidade.
    @ManyToOne
    // Define a coluna estrangeira usada para ligar duas tabelas.
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    // Relaciona muitos registros desta entidade a um registro de outra entidade.
    @ManyToOne
    // Define a coluna estrangeira usada para ligar duas tabelas.
    @JoinColumn(name = "sender_id")
    private User sender;

    // Configura detalhes da coluna no banco.
    @Column(length = 1000)
    private String content;

    private LocalDateTime createdAt;

    
    public Long getId() {
        return id;
    }

    
    public Conversation getConversation() {
        return conversation;
    }

    
    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    
    public User getSender() {
        return sender;
    }

    
    public void setSender(User sender) {
        this.sender = sender;
    }

    
    public String getContent() {
        return content;
    }

    
    public void setContent(String content) {
        this.content = content;
    }

    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
