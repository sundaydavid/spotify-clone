package com.spotify.backend.repository;

import com.spotify.backend.models.UserModel;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String>{

    public UserModel findByUserName(String username);

     Optional<UserModel> findByEmail(String email);

    boolean existsByEmail(String email);
    
}
