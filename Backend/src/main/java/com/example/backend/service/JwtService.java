package com.example.backend.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.jwt.secret:}")
    private String secretKeyBase64; // đặt trong application.properties: app.jwt.secret (base64) hoặc plain

    @Value("${app.jwt.expirationMs:86400000}")
    private long jwtExpirationMs;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw e;
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    private Key getSignInKey(){
        // Support either base64-encoded secret or plain text
        if (secretKeyBase64 == null || secretKeyBase64.isEmpty()) {
            throw new IllegalStateException("JWT secret is not configured (app.jwt.secret)");
        }
        byte[] keyBytes;
        try {
            keyBytes = Decoders.BASE64.decode(secretKeyBase64);
        } catch (Exception ex) {
            // if not base64 -> use UTF-8 bytes
            keyBytes = secretKeyBase64.getBytes();
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
