package com.example.backend.service;

import com.example.backend.model.OrderStatusModel;
import com.example.backend.repository.OrderStatusRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderStatusService {
    private final OrderStatusRepository orderStatusRepository;

    public OrderStatusService(OrderStatusRepository orderStatusRepository) {
        this.orderStatusRepository = orderStatusRepository;
    }

    public List<OrderStatusModel> getAllStatuses() {
        return orderStatusRepository.findAll();
    }

    public OrderStatusModel createStatus(OrderStatusModel status) {
        return orderStatusRepository.save(status);
    }

    public OrderStatusModel getById(String id) {
        return orderStatusRepository.findById(id).orElse(null);
    }

    public void deleteStatus(String id) {
        orderStatusRepository.deleteById(id);
    }

    public OrderStatusModel findByName(String name) {
        return orderStatusRepository.findByName(name);
    }
}
