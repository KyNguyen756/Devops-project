package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "orders")
public class OrderModel {
    @Id
    private String id;
    @DBRef
    private UserModel user;
    @DBRef
    private TableModel table;
    private List<OrderItemModel> items;
    @DBRef
    private OrderStatusModel status;
    private LocalDateTime createdAt;
    private double totalPrice;
}
