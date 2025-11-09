package com.example.backend.controller;

import com.example.backend.model.RoleModel;
import com.example.backend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping
    public List<RoleModel> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/{id}")
    public RoleModel getRoleById(@PathVariable String id) {
        return roleService.getRoleById(id);
    }

    @PostMapping
    public RoleModel createRole(@RequestBody RoleModel role) {
        return roleService.createRole(role);
    }

    @PutMapping("/{id}")
    public RoleModel updateRole(@PathVariable String id, @RequestBody RoleModel role) {
        return roleService.updateRole(id, role);
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable String id) {
        roleService.deleteRole(id);
    }
}
