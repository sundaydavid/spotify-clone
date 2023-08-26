package com.spotify.backend.services;

import com.spotify.backend.models.UserModel;
import com.spotify.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService{
    
    private  final UserRepository repository;

    @Autowired
    public CustomUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }
    
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserModel> dbUser = repository.findByEmail(email);

        return dbUser.map(CustomUsersDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("Couldn't find a matching user email in the database for " + email));
    }    

}