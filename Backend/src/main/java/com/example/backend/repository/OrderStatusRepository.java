package com.example.backend.repository;

import com.example.backend.model.OrderStatusModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderStatusRepository extends MongoRepository<OrderStatusModel, String> {
    OrderStatusModel findByName(String name);
}
