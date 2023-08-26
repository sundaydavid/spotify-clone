package com.spotify.backend.services.user;

import com.spotify.backend.exceptions.ResourceAlreadyInUseException;
import com.spotify.backend.models.UserModel;
import com.spotify.backend.repository.UserRepository;
import java.util.Optional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository uRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository uRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.uRepository = uRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    
    //Register
    public Optional<UserModel> registerUser(String email, String password, String firstName, String lastName, String userName) {
        if (uRepository.existsByEmail(email)) {
            throw new ResourceAlreadyInUseException("Email", "Address", email);
        }

        String encodedPassword = passwordEncoder.encode(password);

        UserModel user = new UserModel();
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUserName(userName);

        return Optional.ofNullable(uRepository.save(user));
    }
    
    
    //Login
    public Optional<Authentication> authentication(String email, String password) {
        return Optional.ofNullable(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)));
    }

}
