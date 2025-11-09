package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class UserModel {
    @Id
    private String id;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @Email
    private String email;
    @DBRef
    private RoleModel roles;  // Tham chiếu sang collection RoleModel
}
