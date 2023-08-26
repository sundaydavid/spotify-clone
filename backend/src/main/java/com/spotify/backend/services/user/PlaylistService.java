package com.spotify.backend.services.user;

import com.spotify.backend.exceptions.BadRequestException;
import com.spotify.backend.exceptions.ResourceNotFoundException;
import com.spotify.backend.models.Playlist;
import com.spotify.backend.models.Song;
import com.spotify.backend.repository.PlaylistRepository;
import com.spotify.backend.repository.SongRepository;
import com.spotify.backend.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {

    private final PlaylistRepository pRepository;
    private final UserRepository uRepository;
    private final SongRepository songRepository;

    public PlaylistService(PlaylistRepository pRepository, UserRepository uRepository, SongRepository songRepository) {
        this.pRepository = pRepository;
        this.uRepository = uRepository;
        this.songRepository = songRepository;
    }

    //Create Playlist
    public Optional<Playlist> createPlaylist(String name, String thumbnail, List<String> songs, String owner) {

        if (name.isBlank() || thumbnail.isBlank() || songs.isEmpty()) {
            throw new BadRequestException("Insufficient data");
        }

        Playlist playlist = new Playlist();
        playlist.setName(name);
        playlist.setThumbnail(thumbnail);
        playlist.setSongs(songs);
        playlist.setOwner(owner);
        playlist.setCollaborators(new ArrayList<>());

        return Optional.ofNullable(pRepository.save(playlist));
    }

    public Optional<Optional<Playlist>> findPlaylistById(String playlistId) throws ResourceNotFoundException {
        Optional<Playlist> playlist = pRepository.findById(playlistId);

        return Optional.ofNullable(playlist);
    }

    public Optional<List<Playlist>> findAllPlaylistByArtist(String artistId) throws ResourceNotFoundException {

        uRepository.findById(artistId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Artist ID: " + artistId));

        return Optional.of(pRepository.findByOwner(artistId));
    }

    public Optional<Playlist> addSongToPlaylist(String currentUser, String playlistId, String songId) throws ResourceNotFoundException {
        Playlist playlist = pRepository.findById(playlistId)
                .orElseThrow(() -> new ResourceNotFoundException("Playlist does not exist"));

        if (!playlist.getOwner().equals(currentUser) && !playlist.getCollaborators().contains(currentUser)) {
            throw new BadRequestException("Not allowed");
        }

        songRepository.findById(songId)
                .orElseThrow(() -> new ResourceNotFoundException("Song does not exist"));

        List<String> songToAdd = playlist.getSongs();
        songToAdd.add(songId);

        playlist.setSongs(songToAdd);
        return Optional.ofNullable(pRepository.save(playlist));
    }

}
