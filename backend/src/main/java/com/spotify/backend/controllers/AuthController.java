package com.spotify.backend.controllers;

import com.spotify.backend.exceptions.BadRequestException;
import com.spotify.backend.models.UserModel;
import com.spotify.backend.repository.UserRepository;
import com.spotify.backend.request.LoginData;
import com.spotify.backend.request.UserData;
import com.spotify.backend.response.ApiResponse;
import com.spotify.backend.services.CustomUsersDetails;
import com.spotify.backend.services.user.AuthService;
import com.spotify.backend.utils.JwtUtils;
import jakarta.validation.Valid;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, JwtUtils jwtUtils, UserRepository userRepository) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    //Register
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid UserData loginUser
    ) {
        return authService.registerUser(loginUser.getEmail(), loginUser.getPassword(), loginUser.getFirstName(), loginUser.getLastName(), loginUser.getUsername())
                .map(user -> {
                    String token = jwtUtils.generateToken(user.getId(), user.getUserName(), user.getEmail());
                    return ResponseEntity.ok(new ApiResponse(user, token));
                })
                .orElseThrow(() -> new BadRequestException("User registration fail"));

    }

    //Login
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginData loginData
    ) {
        Authentication authentication = authService.authentication(loginData.getEmail(), loginData.getPassword())
                .orElseThrow(() -> new BadRequestException("Login fail with details [" + loginData.getEmail() + "" + loginData.getPassword() + "]"));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUsersDetails usersDetails = (CustomUsersDetails) authentication.getPrincipal();
        String id = usersDetails.getId();
        Optional<UserModel> user = userRepository.findById(id);

        String token = jwtUtils.generateToken(usersDetails.getId(), usersDetails.getUsername(), usersDetails.getEmail());

        return ResponseEntity.ok(new ApiResponse(user, token));
    }

}
