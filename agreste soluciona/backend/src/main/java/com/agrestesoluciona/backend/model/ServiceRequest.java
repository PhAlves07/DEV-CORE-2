package com.agrestesoluciona.backend.model;

// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.*;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;

// Indica que a classe vira uma tabela gerenciada pelo JPA.
@Entity
// Define detalhes da tabela no banco, como o nome usado pelo JPA.
@Table(name = "service_requests")

public class ServiceRequest {

    // Marca o campo como chave primaria da tabela.
    @Id
    // Configura geracao automatica do id pelo banco.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Configura detalhes da coluna no banco.
    @Column(length = 1000)
    private String description;

    private String address;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private LocalDateTime createdAt;

    // Relaciona muitos registros desta entidade a um registro de outra entidade.
    @ManyToOne
    // Define a coluna estrangeira usada para ligar duas tabelas.
    @JoinColumn(name = "client_id")
    private User client;

    // Relaciona muitos registros desta entidade a um registro de outra entidade.
    @ManyToOne
    // Define a coluna estrangeira usada para ligar duas tabelas.
    @JoinColumn(name = "provider_id")
    private Provider provider;

    public ServiceRequest() {
    }

    
    public Long getId() {
        return id;
    }

    
    public void setId(Long id) {
        this.id = id;
    }

    
    public String getDescription() {
        return description;
    }

    
    public void setDescription(String description) {
        this.description = description;
    }

    
    public String getAddress() {
        return address;
    }

    
    public void setAddress(String address) {
        this.address = address;
    }

    
    public RequestStatus getStatus() {
        return status;
    }

    
    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    
    public User getClient() {
        return client;
    }

    
    public void setClient(User client) {
        this.client = client;
    }

    
    public Provider getProvider() {
        return provider;
    }

    
    public void setProvider(Provider provider) {
        this.provider = provider;
    }
}