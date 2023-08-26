package com.spotify.backend.controllers;

import com.spotify.backend.exceptions.BadRequestException;
import com.spotify.backend.exceptions.ResourceNotFoundException;
import com.spotify.backend.response.ApiResponse;
import com.spotify.backend.services.user.PlaylistService;
import com.spotify.backend.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/playlist")
public class PlaylistController {
    
    private final PlaylistService pService;
    private final JwtUtils jwtUtils;
    
    public PlaylistController(PlaylistService pService, JwtUtils jwtUtils) {
        this.pService = pService;
        this.jwtUtils = jwtUtils;
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createPlaylist(
            HttpServletRequest request,
            @RequestParam("name") String name,
            @RequestParam("thumbnail") String thumbnail,
            @RequestParam("songs") List<String> songs
    ) {
        
        String token = request.getHeader("Authorization").substring(7);
        String owner = jwtUtils.extractId(token);
        
        return pService.createPlaylist(name, thumbnail, songs, owner)
                .map(playlist -> {
                    return ResponseEntity.ok(new ApiResponse(playlist));
                })
                .orElseThrow(() -> new BadRequestException("Playlist Creation fail"));
    }
    
    @GetMapping("/getPlaylist{playlistId}")
    public ResponseEntity<?> getPlaylistById(@PathVariable("playlistId") String playlistId) throws ResourceNotFoundException {
        
        return pService.findPlaylistById(playlistId)
                .map(playlist -> {
                    return ResponseEntity.ok(new ApiResponse(playlist));
                })
                .orElseThrow(() -> new BadRequestException("Invalid ID"));
    }
    
    @GetMapping("/artist/{artistId}")
    public ResponseEntity<?> getAllPlaylistMadeByArtist(@PathVariable("artistId") String artistId) throws ResourceNotFoundException {
        return pService.findAllPlaylistByArtist(artistId)
                .map(playlist -> {
                    return ResponseEntity.ok(new ApiResponse(playlist));
                })
                .orElseThrow(() -> new BadRequestException("Invalid Artist ID"));
    }
    
    @PostMapping("/add/song")
    public ResponseEntity<?> addSongToPlaylist(
            HttpServletRequest request,
            @RequestParam("playlistId") String playlistId,
            @RequestParam("songId") String songId
            ) throws ResourceNotFoundException {
        
        String token = request.getHeader("Authorization").substring(7);
        String currentUser = jwtUtils.extractId(token);
        
        return pService.addSongToPlaylist(currentUser, playlistId, songId)
                .map(playlist -> {
                    return ResponseEntity.ok(new ApiResponse(playlist));
                })
                .orElseThrow(() -> new BadRequestException("Unable to add song to playlist"));
    }
}
