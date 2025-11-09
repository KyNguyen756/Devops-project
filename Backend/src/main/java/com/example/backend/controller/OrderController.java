package com.example.backend.controller;

import com.example.backend.model.OrderModel;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public List<OrderModel> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public OrderModel createOrder(@RequestBody OrderModel order) {
        return orderService.createOrder(order);
    }

    @GetMapping("/{id}")
    public OrderModel getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
    }

    @PutMapping("/{id}/status")
    public OrderModel updateStatus(@PathVariable String id, @RequestParam String status) {
        return orderService.updateOrderStatus(id, status);
    }

    @GetMapping("/status/{statusName}")
    public List<OrderModel> getOrdersByStatus(@PathVariable String statusName) {
        return orderService.getOrdersByStatus(statusName);
    }

}