package com.example.backend.service;

import com.example.backend.auth.*;
import com.example.backend.model.RoleModel;
import com.example.backend.model.UserModel;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    public AuthResponse login(AuthRequest request) {
        // authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // Load full UserModel from DB
        UserModel user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Generate token
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtService.generateToken(userDetails);

        // Build UserResponse
        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(RoleResponse.builder().name(user.getRoles().getName()).build())
                .build();

        // Return full AuthResponse with user
        return new AuthResponse(token, userResponse);
    }

    public String register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        UserModel user = UserModel.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .email(req.getEmail())
                .build();

        RoleModel role = roleRepository.findByName("USER")
                .orElseGet(() -> roleRepository.save(RoleModel.builder().name("USER").build()));
        user.setRoles(role);

        userRepository.save(user);
        return "User registered successfully!";
    }
}