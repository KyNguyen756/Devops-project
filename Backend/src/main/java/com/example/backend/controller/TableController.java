package com.example.backend.controller;

import com.example.backend.model.TableModel;
import com.example.backend.service.TableService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class TableController {
    private final TableService tableService;

    @GetMapping
    public List<TableModel> getAllTables() {
        return tableService.getAllTables();
    }

    @GetMapping("/{id}")
    public TableModel getTableById(@PathVariable String id) {
        return tableService.getTableById(id);
    }

    @PostMapping
    public TableModel createTable(@RequestBody TableModel table) {
        return tableService.createTable(table);
    }

    @PutMapping("/{id}")
    public TableModel updateTable(@PathVariable String id, @RequestBody TableModel table) {
        return tableService.updateTable(id, table);
    }

    @PatchMapping("/{id}/status/{statusId}")
    public TableModel updateTableStatus(@PathVariable String id, @PathVariable String statusId) {
        return tableService.updateTableStatus(id, statusId);
    }

    @DeleteMapping("/{id}")
    public void deleteTable(@PathVariable String id) {
        tableService.deleteTable(id);
    }
}
