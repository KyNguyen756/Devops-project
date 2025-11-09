package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "roles")
public class RoleModel {
    @Id
    private String id;
    @NotBlank
    private String name; // "ROOT", "ADMIN", "USER"
}
