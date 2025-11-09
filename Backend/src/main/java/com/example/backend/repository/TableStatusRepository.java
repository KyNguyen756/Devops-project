package com.example.backend.repository;

import com.example.backend.model.TableStatusModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface TableStatusRepository extends MongoRepository<TableStatusModel, String> {
    Optional<TableStatusModel> findByName(String name);
}
