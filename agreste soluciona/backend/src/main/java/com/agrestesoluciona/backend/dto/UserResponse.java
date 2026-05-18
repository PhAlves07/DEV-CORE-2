package com.agrestesoluciona.backend.dto;

import com.agrestesoluciona.backend.model.User;

public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }
}
