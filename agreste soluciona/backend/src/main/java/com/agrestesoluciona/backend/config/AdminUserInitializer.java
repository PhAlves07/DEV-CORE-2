package com.agrestesoluciona.backend.config;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.service.UserService;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.beans.factory.annotation.Value;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.boot.CommandLineRunner;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private final UserService userService;

    @Value("${app.admin.name:Administrador}")
    private String adminName;

    @Value("${app.admin.email:admin@agrestesoluciona.com}")
    private String adminEmail;

    @Value("${app.admin.phone:00000000000}")
    private String adminPhone;

    @Value("${app.admin.password:admin123}")
    private String adminPassword;

    public AdminUserInitializer(UserService userService) {
        this.userService = userService;
    }

    @Override
    
    public void run(String... args) {
        userService.createAdminIfMissing(
                adminName,
                adminEmail,
                adminPhone,
                adminPassword);
    }
}
