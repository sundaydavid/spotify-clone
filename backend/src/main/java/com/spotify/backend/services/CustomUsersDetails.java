package com.spotify.backend.services;

import com.spotify.backend.models.UserModel;
import java.util.Collection;
import java.util.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class CustomUsersDetails implements UserDetails{
    
    private final UserModel user;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUsersDetails(UserModel user) {
        this.user = user;
    }
    
    public String getId() {
        return user.getId();
    }
    
    public String getEmail() {
       return user.getEmail();
    }
    
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

     @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.user);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final CustomUsersDetails other = (CustomUsersDetails) obj;
        return Objects.equals(this.user, other.user);
    }
    
}
