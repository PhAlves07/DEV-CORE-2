package com.agrestesoluciona.backend.model;

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
import jakarta.persistence.OneToOne;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.Table;

// Indica que a classe vira uma tabela gerenciada pelo JPA.
@Entity
// Define detalhes da tabela no banco, como o nome usado pelo JPA.
@Table(name = "conversations")

public class Conversation {

    // Marca o campo como chave primaria da tabela.
    @Id
    // Configura geracao automatica do id pelo banco.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relaciona esta entidade com exatamente uma entidade de outro tipo.
    @OneToOne
    // Define a coluna estrangeira usada para ligar duas tabelas.
    @JoinColumn(name = "service_request_id")
    private ServiceRequest serviceRequest;

    
    public Long getId() {
        return id;
    }

    
    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    
    public void setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
    }
}
