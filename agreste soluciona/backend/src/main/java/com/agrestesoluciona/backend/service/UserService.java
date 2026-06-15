package com.agrestesoluciona.backend.service;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.beans.factory.annotation.Autowired;
// Classe HTTP usada para controlar status e corpo das respostas da API.
import org.springframework.http.HttpStatus;
// Marca a classe como service, camada onde ficam regras de negocio.
import org.springframework.stereotype.Service;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.web.server.ResponseStatusException;

// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.model.User;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import com.agrestesoluciona.backend.repository.UserRepository;

// BCrypt criptografa e valida senhas sem armazenar texto puro.
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// Optional representa um valor que pode existir ou nao, evitando null direto.
import java.util.Optional;

// Marca a classe como camada de servico, onde ficam regras de negocio.
@Service

public class UserService {

    // Pede ao Spring para injetar automaticamente uma dependencia.
    @Autowired
    private UserRepository userRepository;

    // Pede ao Spring para injetar automaticamente uma dependencia.
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    
    public User saveUser(User user) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Optional<User> userExists = userRepository.findByEmail(user.getEmail());

        if (userExists.isPresent()) {

            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException(
                    "Email já cadastrado");
        }

        String encryptedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encryptedPassword);
        user.setAdmin(false);

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return userRepository.save(user);
    }

    
    public User createAdminIfMissing(
            String name,
            String email,
            String phone,
            String password) {

        if (userRepository.existsByAdminTrue()) {
            return null;
        }

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setAdmin(true);
            // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
            return userRepository.save(user);
        }

        User admin = new User();
        admin.setName(name);
        admin.setEmail(email);
        admin.setPhone(phone);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setAdmin(true);

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        return userRepository.save(admin);
    }

    
    public void validateAdmin(Long userId) {
        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "Usuario sem permissao de administrador"));

        if (!Boolean.TRUE.equals(user.getAdmin())) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Usuario sem permissao de administrador");
        }
    }

    
    public User login(String email, String password) {

        // Acesso ao banco por repository; o Spring Data implementa a operacao automaticamente.
        Optional<User> userExists = userRepository.findByEmail(email);

        if (userExists.isEmpty()) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Usuário não encontrado");
        }

        User user = userExists.get();

        boolean passwordMatch = passwordEncoder.matches(
                password,
                user.getPassword());

        if (!passwordMatch) {
            // Regra de validacao: quando algo esta invalido, o backend interrompe o fluxo com erro.
            throw new RuntimeException("Senha incorreta");
        }

        return user;
    }
}
