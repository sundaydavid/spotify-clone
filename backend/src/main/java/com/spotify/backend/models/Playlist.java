package com.spotify.backend.models;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "playlist")
public class Playlist{
    
    @Id
    private String id;

    @Field(name = "name")
    @NotNull
    private String name;

    @Field(name = "thumbnail")
    @NotNull
    private String thumbnail;

    @Field(name = "songs", targetType = FieldType.OBJECT_ID)
    private List<String> songs;

    @Field(name = "owner", targetType = FieldType.OBJECT_ID)
    private String owner;

    @Field(name = "collaborators", targetType = FieldType.OBJECT_ID)
    private List<String> collaborators;

    public Playlist() {
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

    public List<String> getSongs() {
        return songs;
    }

    public void setSongs(List<String> songs) {
        this.songs = songs;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public List<String> getCollaborators() {
        return collaborators;
    }

    public void setCollaborators(List<String> collaborators) {
        this.collaborators = collaborators;
    }

    
}
