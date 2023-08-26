package com.spotify.backend.repository;

import com.spotify.backend.models.Song;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends MongoRepository<Song, String>{

    List<Song> findByArtist(String artist);
    
    List<Song> findByName(String songName);
    
}
