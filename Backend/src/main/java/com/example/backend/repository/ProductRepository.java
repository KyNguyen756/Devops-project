package com.example.backend.repository;

import com.example.backend.model.ProductModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<ProductModel, String> {
    Optional<ProductModel> findByName(String name);
}
