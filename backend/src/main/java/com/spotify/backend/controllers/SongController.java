package com.spotify.backend.controllers;

import com.spotify.backend.exceptions.BadRequestException;
import com.spotify.backend.exceptions.ResourceNotFoundException;
import com.spotify.backend.request.SongDetails;
import com.spotify.backend.response.ApiResponse;
import com.spotify.backend.services.user.SongService;
import com.spotify.backend.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/song")
public class SongController {

    private final SongService songService;
    private final JwtUtils jwtUtils;

    public SongController(SongService songService, JwtUtils jwtUtils) {
        this.songService = songService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSong(
            HttpServletRequest request,
            @RequestBody @Valid SongDetails songData
    ) {

        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtUtils.extractId(token);

        return songService.createSong(songData.getName(), songData.getThumbnail(), songData.getTrack(), userId)
                .map(song -> {
                    return ResponseEntity.ok(new ApiResponse(song));
                })
                .orElseThrow(() -> new BadRequestException("Song registration fail"));
    }

    @GetMapping("/mySong")
    public ResponseEntity<?> findMySong(HttpServletRequest request) throws ResourceNotFoundException {
        String token = request.getHeader("Authorization").substring(7);
        String artist = jwtUtils.extractId(token);

        return songService.findByArtist(artist)
                .map(song -> {
                    return ResponseEntity.ok(new ApiResponse(song));
                })
                .orElseThrow(() -> new BadRequestException("No song found with the parameter: " + artist));
    }

    @GetMapping("/artist/{artistId}")
    public ResponseEntity<?> findSongByArtist(@PathVariable("artistId") String artistId) throws ResourceNotFoundException {
        return songService.findByArtist(artistId)
                .map(songs -> {
                    return ResponseEntity.ok(new ApiResponse(songs));
                })
                .orElseThrow(() -> new BadRequestException("No song found with the parameter: " + artistId));
    }

    @GetMapping("/songName/{songName}")
    public ResponseEntity<?> findSongByName(@PathVariable("songName") String songName) {
        return songService.findSongByName(songName)
                .map(songs -> {
                    return ResponseEntity.ok(new ApiResponse(songs));
                })
                .orElseThrow(() -> new BadRequestException("No song found with the parameter: " + songName));
    }
}
