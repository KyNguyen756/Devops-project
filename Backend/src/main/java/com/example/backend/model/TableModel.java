package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "tables")
public class TableModel {
    @Id
    private String id;
    private String name;
    private int capacity;
    @DBRef
    private TableStatusModel status;
}
