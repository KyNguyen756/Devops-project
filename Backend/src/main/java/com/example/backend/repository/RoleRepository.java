package com.example.backend.repository;

import com.example.backend.model.RoleModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface RoleRepository extends MongoRepository<RoleModel, String> {
    Optional<RoleModel> findByName(String name);
}
