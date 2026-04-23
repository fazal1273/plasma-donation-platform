package com.plasma.dto;
import jakarta.validation.constraints.*;
import lombok.*;

public class AuthDtos {
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public static class SignupRequest {
        @NotBlank @Size(max = 100) private String name;
        @NotBlank @Email @Size(max = 255) private String email;
        @NotBlank @Size(min = 6, max = 100) private String password;
    }
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public static class LoginRequest {
        @NotBlank @Email private String email;
        @NotBlank private String password;
    }
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class AuthResponse {
        private String token;
        private String name;
        private String email;
    }
}
