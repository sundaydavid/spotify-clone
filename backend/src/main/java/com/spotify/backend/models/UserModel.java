package com.spotify.backend.models;

import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "user")
public class UserModel {

    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";

    @Id
    private String _id;

    @Field(name = "firstName")
    @NotNull
    private String firstName;

    @Field(name = "lastName")
    @NotNull
    private String lastName;

    @Email
    @Field(name = "email")
    @NotNull
    private String email;

    @Field(name = "userName")
    @NotNull
    private String userName;

    @Field(name = "password")
    @NotNull
    private String password;

    @Field(name = "likedSongs")
    private String likedSongs = "";

    @Field(name = "likedPlaylists")
    private String likedPlaylists = "";

    @Field(name = "subscribedArtists")
    private String subscribedArtists = "";
    
    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public UserModel() {
    }

    public UserModel(String _id, String firstName, String lastName, String email, String userName, String password) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.password = password;
    }

    public String getId() {
        return _id;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLikedSongs() {
        return likedSongs;
    }

    public void setLikedSongs(String likedSongs) {
        this.likedSongs = likedSongs;
    }

    public String getLikedPlaylists() {
        return likedPlaylists;
    }

    public void setLikedPlaylists(String likedPlaylists) {
        this.likedPlaylists = likedPlaylists;
    }

    public String getSubscribedArtists() {
        return subscribedArtists;
    }

    public void setSubscribedArtists(String subscribedArtists) {
        this.subscribedArtists = subscribedArtists;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

}
