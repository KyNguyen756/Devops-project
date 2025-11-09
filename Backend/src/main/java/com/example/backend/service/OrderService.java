package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final TableRepository tableRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final ProductRepository productRepository;

    public List<OrderModel> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderModel createOrder(OrderModel order) {
        UserModel user;
        TableModel table;

        if (order.getUser() == null || order.getUser().getId() == null) {
            throw new IllegalArgumentException("User ID is required");
        } else {
        user = userRepository.findById(order.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User does not exist with ID: " + order.getUser().getId()));
        }
        order.setUser(user);

        if (order.getTable() == null || order.getTable().getId() == null) {
            throw new IllegalArgumentException("Table ID is required");
        }
        table = tableRepository.findById(order.getTable().getId())
                .orElseThrow(() -> new RuntimeException("Table does not exist with ID: " + order.getTable().getId()));
        order.setTable(table);

        if (order.getStatus() == null) {
            OrderStatusModel defaultStatus = orderStatusRepository.findByName("PENDING");
            if (defaultStatus == null) {
                OrderStatusModel newStatus = OrderStatusModel.builder()
                        .name("PENDING")
                        .build();
                defaultStatus = orderStatusRepository.save(newStatus);
            }
            if (defaultStatus.getId() == null) {
                throw new IllegalStateException("OrderStatus ID is null after save");
            }
            order.setStatus(defaultStatus);
        }

        List<OrderItemModel> processedItems = new ArrayList<>();
        for (OrderItemModel item : order.getItems()) {
            if (item.getProductName() == null || item.getProductName().isBlank()) {
                throw new IllegalArgumentException("Product name is required in items");
            }

            ProductModel product = productRepository.findByName(item.getProductName())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductName()));

            OrderItemModel itemToSave = OrderItemModel.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .quantity(item.getQuantity())
                    .price(product.getPrice())
                    .build();

            processedItems.add(itemToSave);
        }
        order.setItems(processedItems);

        double total = order.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        order.setTotalPrice(total);
        order.setCreatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    public Optional<OrderModel> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    public OrderModel updateOrderStatus(String orderId, String statusName) {
        Optional<OrderModel> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            OrderModel order = orderOpt.get();
            OrderStatusModel status = orderStatusRepository.findByName(statusName);
            if (status == null) {
                throw new RuntimeException("Không tìm thấy trạng thái: " + statusName);
            }
            order.setStatus(status);
            return orderRepository.save(order);
        }
        throw new RuntimeException("Không tìm thấy đơn hàng với ID: " + orderId);
    }

    public List<OrderModel> getOrdersByStatus(String statusName) {
        OrderStatusModel status = orderStatusRepository.findByName(statusName);
        if (status == null) {
            throw new RuntimeException("Không tìm thấy trạng thái: " + statusName);
        }
        return orderRepository.findByStatus(status);
    }

}
