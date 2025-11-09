package com.example.backend.security;

import com.example.backend.model.UserModel;
import com.example.backend.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // roles field in your model is RoleModel roles (single). Adapt if multiple.
        Collection<GrantedAuthority> authorities = Collections.emptyList();
        if (user.getRoles() != null && user.getRoles().getName() != null) {
            authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRoles().getName()));
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }
}
