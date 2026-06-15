package com.agrestesoluciona.backend.model;

// Anotacao JPA usada para mapear classes, campos e relacionamentos no banco.
import jakarta.persistence.*;

// Indica que a classe vira uma tabela gerenciada pelo JPA.
@Entity
// Define detalhes da tabela no banco, como o nome usado pelo JPA.
@Table(name = "providers")

public class Provider {

    // Marca o campo como chave primaria da tabela.
    @Id
    // Configura geracao automatica do id pelo banco.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String profession;

    private String cpfCnpj;

    private String city;

    private Integer experienceYears;

    private String availability;

    private Boolean hasCertificate;

    private String certificateImage;

    private Boolean approved;

    // Configura detalhes da coluna no banco.
    @Column(length = 1000)
    private String description;

    // Relaciona esta entidade com exatamente uma entidade de outro tipo.
    @OneToOne
    // Define a coluna estrangeira usada para ligar duas tabelas.
    @JoinColumn(name = "user_id")
    private User user;

    public Provider() {
    }

    
    public Long getId() {
        return id;
    }

    
    public void setId(Long id) {
        this.id = id;
    }

    
    public String getProfession() {
        return profession;
    }

    
    public void setProfession(String profession) {
        this.profession = profession;
    }

    
    public String getCpfCnpj() {
        return cpfCnpj;
    }

    
    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
    }

    
    public String getCity() {
        return city;
    }

    
    public void setCity(String city) {
        this.city = city;
    }

    
    public Integer getExperienceYears() {
        return experienceYears;
    }

    
    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    
    public String getAvailability() {
        return availability;
    }

    
    public void setAvailability(String availability) {
        this.availability = availability;
    }

    
    public Boolean getHasCertificate() {
        return hasCertificate;
    }

    
    public void setHasCertificate(Boolean hasCertificate) {
        this.hasCertificate = hasCertificate;
    }

    
    public String getCertificateImage() {
        return certificateImage;
    }

    
    public void setCertificateImage(String certificateImage) {
        this.certificateImage = certificateImage;
    }

    
    public Boolean getApproved() {
        return approved;
    }

    
    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    
    public String getDescription() {
        return description;
    }

    
    public void setDescription(String description) {
        this.description = description;
    }

    
    public User getUser() {
        return user;
    }

    
    public void setUser(User user) {
        this.user = user;
    }
}