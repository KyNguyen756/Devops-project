// src/main/java/com/example/backend/auth/AuthResponse.java
package com.example.backend.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private UserResponse user; // ← THÊM TRƯỜNG NÀY

    public AuthResponse(String token, UserResponse user) {
        this.token = token;
        this.tokenType = "Bearer";
        this.user = user;
    }
}