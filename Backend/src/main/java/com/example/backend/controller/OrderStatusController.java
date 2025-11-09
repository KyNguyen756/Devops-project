package com.example.backend.controller;

import com.example.backend.model.OrderStatusModel;
import com.example.backend.service.OrderStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-status")
@RequiredArgsConstructor
public class OrderStatusController {

    private final OrderStatusService orderStatusService;

    @GetMapping
    public List<OrderStatusModel> getAllStatuses() {
        return orderStatusService.getAllStatuses();
    }

    @PostMapping
    public OrderStatusModel createStatus(@RequestBody OrderStatusModel status) {
        return orderStatusService.createStatus(status);
    }

    @GetMapping("/{id}")
    public OrderStatusModel getById(@PathVariable String id) {
        return orderStatusService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteStatus(@PathVariable String id) {
        orderStatusService.deleteStatus(id);
    }
}