package com.example.backend.service;

import com.example.backend.model.RoleModel;
import com.example.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public List<RoleModel> getAllRoles() {
        return roleRepository.findAll();
    }

    public RoleModel getRoleById(String id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }

    public RoleModel createRole(RoleModel role) {
        return roleRepository.save(role);
    }

    public RoleModel updateRole(String id, RoleModel updatedRole) {
        return roleRepository.findById(id)
                .map(r -> {
                    r.setName(updatedRole.getName());
                    return roleRepository.save(r);
                })
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }

    public void deleteRole(String id) {
        roleRepository.deleteById(id);
    }
}
