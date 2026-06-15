package com.agrestesoluciona.backend.dto;

public class AdminProviderDTO {

    private Long id;

    private String name;

    private String profession;

    private String city;

    private Boolean approved;

    public AdminProviderDTO(
            Long id,
            String name,
            String profession,
            String city,
            Boolean approved) {

        this.id = id;
        this.name = name;
        this.profession = profession;
        this.city = city;
        this.approved = approved;
    }

    
    public Long getId() {
        return id;
    }

    
    public String getName() {
        return name;
    }

    
    public String getProfession() {
        return profession;
    }

    
    public String getCity() {
        return city;
    }

   
    public Boolean getApproved() {
        return approved;
    }
}
