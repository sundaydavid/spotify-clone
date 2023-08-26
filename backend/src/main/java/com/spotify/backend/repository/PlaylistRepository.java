package com.spotify.backend.repository;

import com.spotify.backend.models.Playlist;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends MongoRepository<Playlist, String>{
    List<Playlist> findByOwner(String artistId);
}
