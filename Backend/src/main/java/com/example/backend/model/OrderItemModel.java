package com.example.backend.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemModel {
    @Field("product_id")
    private String productId;
    @Field("product_name")
    private String productName;
    private int quantity;
    @Field("unit_price")
    private double price;
}