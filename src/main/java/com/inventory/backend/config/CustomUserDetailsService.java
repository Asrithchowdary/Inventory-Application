package com.inventory.backend.config;

import java.util.Collections;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import com.inventory.backend.Repository.UserRepository;
import com.inventory.backend.entity.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()
        );
    }
}