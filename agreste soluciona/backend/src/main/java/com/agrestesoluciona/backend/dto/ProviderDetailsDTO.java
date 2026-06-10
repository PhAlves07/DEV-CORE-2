package com.agrestesoluciona.backend.dto;

public class ProviderDetailsDTO {

    private Long id;
    private String name;
    private String phone;
    private String profession;
    private String city;
    private Integer experienceYears;
    private String availability;
    private String description;

    public ProviderDetailsDTO(
            Long id,
            String name,
            String phone,
            String profession,
            String city,
            Integer experienceYears,
            String availability,
            String description) {

        this.id = id;
        this.name = name;
        this.phone = phone;
        this.profession = profession;
        this.city = city;
        this.experienceYears = experienceYears;
        this.availability = availability;
        this.description = description;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getProfession() { return profession; }
    public String getCity() { return city; }
    public Integer getExperienceYears() { return experienceYears; }
    public String getAvailability() { return availability; }
    public String getDescription() { return description; }
}