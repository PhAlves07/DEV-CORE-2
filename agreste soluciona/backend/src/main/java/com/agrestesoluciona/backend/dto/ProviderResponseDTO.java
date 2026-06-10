package com.agrestesoluciona.backend.dto;

public class ProviderResponseDTO {

    private Long id;

    private String name;

    private String profession;

    private String city;

    private Integer experienceYears;

    private String availability;

    public ProviderResponseDTO() {
    }

    public ProviderResponseDTO(
            Long id,
            String name,
            String profession,
            String city,
            Integer experienceYears,
            String availability) {

        this.id = id;
        this.name = name;
        this.profession = profession;
        this.city = city;
        this.experienceYears = experienceYears;
        this.availability = availability;
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

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public String getAvailability() {
        return availability;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
}