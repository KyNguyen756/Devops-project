package com.example.backend.service;

import com.example.backend.model.TableModel;
import com.example.backend.model.TableStatusModel;
import com.example.backend.repository.TableRepository;
import com.example.backend.repository.TableStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TableService {
    private final TableRepository tableRepository;
    private final TableStatusRepository tableStatusRepository;

    public List<TableModel> getAllTables() {
        return tableRepository.findAll();
    }

    public TableModel getTableById(String id) {
        return tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found"));
    }

    public TableModel createTable(TableModel table) {
        TableStatusModel tabelStatus;
        if (table.getStatus() == null) {
            tabelStatus = tableStatusRepository.findByName("AVAILABLE")
                    .orElseThrow(() -> new RuntimeException("Default table status not found"));
        } else {
            tabelStatus = tableStatusRepository.findById(table.getStatus().getId())
                    .orElseThrow(() -> new RuntimeException("Table status not exist"));
        }
        table.setStatus(tabelStatus);
        return tableRepository.save(table);
    }

    public TableModel updateTable(String id, TableModel updatedTable) {
        return tableRepository.findById(id)
                .map(t -> {
                    t.setName(updatedTable.getName());
                    t.setCapacity(updatedTable.getCapacity());
                    t.setStatus(updatedTable.getStatus());
                    return tableRepository.save(t);
                })
                .orElseThrow(() -> new RuntimeException("Table not found"));
    }

    public void deleteTable(String id) {
        tableRepository.deleteById(id);
    }

    public TableModel updateTableStatus(String id, String statusId) {
        TableStatusModel status = tableStatusRepository.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Status not found"));
        TableModel table = getTableById(id);
        table.setStatus(status);
        return tableRepository.save(table);
    }
}
