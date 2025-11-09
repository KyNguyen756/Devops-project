package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "order_statuses")
public class OrderStatusModel {
    @Id
    private String id;
    private String name;        // PENDING, PAID, CANCELLED,...
}
