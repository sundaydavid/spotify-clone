package com.spotify.backend.models;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "song")
public class Song{
    
    @Id
    private String id;

    @Field(name = "name")
    @NotNull
    private String name;

    @Field(name = "thumbnail")
    @NotNull
    private String thumbnail;

    @Field(name = "track")
    @NotNull
    private String track;

    @Field(name = "artist", targetType = FieldType.OBJECT_ID)
    private String artist;

    public Song() {
    }
    
    public Song(String name, String thumbnail, String track, String artist) {
        this.name = name;
        this.thumbnail = thumbnail;
        this.track = track;
        this.artist = artist;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getTrack() {
        return track;
    }

    public void setTrack(String track) {
        this.track = track;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

}
