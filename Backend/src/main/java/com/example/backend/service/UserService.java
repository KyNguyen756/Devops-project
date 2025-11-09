package com.example.backend.service;

import com.example.backend.model.RoleModel;
import com.example.backend.model.UserModel;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserModel> getUserById(String id) {
        return userRepository.findById(id);
    }

    public UserModel createUser(UserModel user) {
        RoleModel role;
        if (user.getRoles() == null) {
            role = roleRepository.findByName("ADMIN")
                    .orElseThrow(() -> new RuntimeException("Default role not found"));
        } else {
            role = roleRepository.findById(user.getRoles().getId())
                    .orElseThrow(() -> new RuntimeException("Role does not exist"));
        }
        user.setRoles(role);
        return userRepository.save(user);
    }

    public UserModel updateUser(String id, UserModel updatedUser) {
        return userRepository.findById(id)
                .map(u -> {

                    if (updatedUser.getUsername() != null) {
                        u.setUsername(updatedUser.getUsername());
                    }


                    if (updatedUser.getPassword() != null) {
                        u.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                    }


                    if (updatedUser.getEmail() != null) {
                        u.setEmail(updatedUser.getEmail());
                    }


                    if (updatedUser.getRoles() != null) {

                        RoleModel role = roleRepository.findByName(updatedUser.getRoles().getName())
                                .orElseThrow(() -> new RuntimeException("Role not found: " + updatedUser.getRoles().getName()));
                        u.setRoles(role);
                    }


                    return userRepository.save(u);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
