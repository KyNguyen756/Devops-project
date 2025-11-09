package com.example.backend.repository;

import com.example.backend.model.OrderModel;
import com.example.backend.model.OrderStatusModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface OrderRepository extends MongoRepository<OrderModel, String> {
    List<OrderModel> findByStatus(OrderStatusModel status);
}
