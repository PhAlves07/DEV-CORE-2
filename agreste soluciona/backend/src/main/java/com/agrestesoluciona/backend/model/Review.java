package com.agrestesoluciona.backend.model;

// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.*;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import java.time.LocalDateTime;

// Indica que a classe vira uma tabela gerenciada pelo JPA.
@Entity
// Define detalhes da tabela no banco, como o nome usado pelo JPA.
@Table(name = "reviews")

public class Review {

    // Marca o campo como chave primaria da tabela.
    @Id
    // Configura geracao automatica do id pelo banco.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rating;

    // Configura detalhes da coluna no banco.
    @Column(length = 1000)
    private String comment;

    private LocalDateTime createdAt;

    // Relaciona muitos registros desta entidade a um registro de outra entidade.
    @ManyToOne
    // Define a coluna estrangeira usada para ligar duas tabelas.
    @JoinColumn(name = "service_request_id")
    private ServiceRequest serviceRequest;

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

    public Review() {
    }

    
    public Long getId() {
        return id;
    }

    
    public Integer getRating() {
        return rating;
    }

    
    public void setRating(Integer rating) {
        this.rating = rating;
    }

    
    public String getComment() {
        return comment;
    }

    
    public void setComment(String comment) {
        this.comment = comment;
    }

    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    
    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    
    public void setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
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
