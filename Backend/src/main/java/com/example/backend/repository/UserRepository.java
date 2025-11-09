package com.example.backend.repository;

import com.example.backend.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<UserModel, String> {
    Optional<UserModel> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
