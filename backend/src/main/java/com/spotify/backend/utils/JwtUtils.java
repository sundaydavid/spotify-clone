package com.spotify.backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtUtils {
    
    public static final String SECRET = "======================Bezkoder=Spring========================";

    @Value("${apexon.jwt.secret}")
    private String jwtSecret;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getAudience);
    }
    
     
    public String extractId(String token) {
        return extractClaim(token, Claims::getId);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String id, String username, String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, id, username, email);
    }

    private String createToken(Map<String, Object> claims, String id, String userName, String email) {
        return Jwts.builder().setClaims(claims)
                .setSubject(userName)
                .setId(id)
                .setAudience(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET));
    }

    public Boolean validateToken(String token, String username) {
        final String usernamefromtoken = extractUsername(token);
        return (usernamefromtoken.equals(username) && !isTokenExpired(token));
    }
}
