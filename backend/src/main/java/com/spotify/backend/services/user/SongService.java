package com.spotify.backend.services.user;

import com.spotify.backend.exceptions.BadRequestException;
import com.spotify.backend.exceptions.ResourceNotFoundException;
import com.spotify.backend.models.Song;
import com.spotify.backend.models.UserModel;
import com.spotify.backend.repository.SongRepository;
import com.spotify.backend.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class SongService {

    private final SongRepository songRepository;
    private final UserRepository userRepository;

    public SongService(SongRepository songRepository, UserRepository userRepository) {
        this.songRepository = songRepository;
        this.userRepository = userRepository;
    }

    //Create song
    public Optional<Song> createSong(String name, String thumbnail, String track, String artist) {

        if (name.isEmpty() || thumbnail.isEmpty() || track.isEmpty()) {
            throw new BadRequestException("Insufficient details to create song");
        }

        Song song = new Song();
        song.setName(name);
        song.setThumbnail(thumbnail);
        song.setTrack(track);
        song.setArtist(artist);

        return Optional.ofNullable(songRepository.save(song));
    }

    public Optional<List<Song>> findByArtist(String artistId) throws ResourceNotFoundException {

        userRepository.findById(artistId)
                .orElseThrow(() -> new ResourceNotFoundException("Artist does not exist: " + artistId));

        return Optional.of(songRepository.findByArtist(artistId));
    }

    public Optional<List<Song>> findSongByName(String songName) {
        return Optional.of(songRepository.findByName(songName));
    }
}
