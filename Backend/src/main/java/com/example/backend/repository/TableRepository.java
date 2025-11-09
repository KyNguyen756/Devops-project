package com.example.backend.repository;

import com.example.backend.model.TableModel;
import com.example.backend.model.TableStatusModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TableRepository extends MongoRepository<TableModel, String> {
    List<TableModel> findByStatus(TableStatusModel status);
}
