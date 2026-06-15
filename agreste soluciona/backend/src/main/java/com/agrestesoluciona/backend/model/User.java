package com.agrestesoluciona.backend.model;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.fasterxml.jackson.annotation.JsonProperty;

// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.Entity;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.GeneratedValue;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.GenerationType;
// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.Id;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import jakarta.validation.constraints.Email;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import jakarta.validation.constraints.NotBlank;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import jakarta.validation.constraints.Size;

// Indica que a classe vira uma tabela gerenciada pelo JPA.
@Entity

public class User {


    // Marca o campo como chave primaria da tabela.
    @Id
    // Configura geracao automatica do id pelo banco.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome obrigatório")
    private String name;

    @NotBlank(message = "Email obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Telefone obrigatório")
    private String phone;

    @NotBlank(message = "Senha obrigatória")
    @Size(min = 6, message = "Senha precisa ter no mínimo 6 caracteres")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Boolean admin = false;


    // GETTERS E SETTERS

    
    public Long getId() {
        return id;
    }

    
    public void setId(Long id) {
        this.id = id;
    }

    
    public String getName() {
        return name;
    }

    
    public void setName(String name) {
        this.name = name;
    }

    
    public String getEmail() {
        return email;
    }

    
    public void setEmail(String email) {
        this.email = email;
    }

    
    public String getPhone() {
        return phone;
    }

    
    public void setPhone(String phone) {
        this.phone = phone;
    }

    
    public String getPassword() {
        return password;
    }

    
    public void setPassword(String password) {
        this.password = password;
    }

    
    public Boolean getAdmin() {
        return admin;
    }

    
    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}
