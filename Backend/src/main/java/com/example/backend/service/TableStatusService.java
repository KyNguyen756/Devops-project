package com.example.backend.service;

import com.example.backend.model.TableStatusModel;
import com.example.backend.repository.TableStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TableStatusService {
    private final TableStatusRepository tableStatusRepository;

    public List<TableStatusModel> getAllStatuses() {
        return tableStatusRepository.findAll();
    }

    public TableStatusModel createStatus(TableStatusModel status) {
        return tableStatusRepository.save(status);
    }
}
