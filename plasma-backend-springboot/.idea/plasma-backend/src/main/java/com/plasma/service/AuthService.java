package com.plasma.service;
import com.plasma.dto.AuthDtos.*;
import com.plasma.entity.User;
import com.plasma.repository.UserRepository;
import com.plasma.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;
    public AuthService(UserRepository repo, PasswordEncoder encoder, JwtUtil jwt) {
        this.repo = repo; this.encoder = encoder; this.jwt = jwt;
    }
    public AuthResponse signup(SignupRequest r) {
        if (repo.existsByEmail(r.getEmail())) throw new RuntimeException("Email already registered");
        User u = User.builder().name(r.getName()).email(r.getEmail())
                .password(encoder.encode(r.getPassword())).build();
        repo.save(u);
        return AuthResponse.builder().token(jwt.generate(u.getEmail())).name(u.getName()).email(u.getEmail()).build();
    }
    public AuthResponse login(LoginRequest r) {
        User u = repo.findByEmail(r.getEmail()).orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!encoder.matches(r.getPassword(), u.getPassword())) throw new RuntimeException("Invalid credentials");
        return AuthResponse.builder().token(jwt.generate(u.getEmail())).name(u.getName()).email(u.getEmail()).build();
    }
}
