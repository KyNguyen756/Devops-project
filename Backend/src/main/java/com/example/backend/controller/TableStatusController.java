package com.example.backend.controller;

import com.example.backend.model.TableStatusModel;
import com.example.backend.service.TableStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/table-status")
@RequiredArgsConstructor
public class TableStatusController {
    private final TableStatusService tableStatusService;

    @GetMapping
    public List<TableStatusModel> getAllStatuses() {
        return tableStatusService.getAllStatuses();
    }

    @PostMapping
    public TableStatusModel createStatus(@RequestBody TableStatusModel status) {
        return tableStatusService.createStatus(status);
    }
}
