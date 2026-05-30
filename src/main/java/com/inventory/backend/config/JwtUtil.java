package com.inventory.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey key;

    private final String SECRET = "my-super-secret-key-that-is-at-least-32-bytes-long";
    
    private static final long EXPIRATION = 1000 * 60 * 60 * 24;

    @PostConstruct
    public void init() {
        key = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }

    // ✅ GENERATE TOKEN (NEW API)
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }

    // ✅ EXTRACT USERNAME
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ✅ VALIDATE TOKEN
    public boolean isTokenValid(String token, String username) {
        return extractUsername(token).equals(username) && !isExpired(token);
    }

    private boolean isExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    // ✅ CORE PARSER (ONLY NEW API)
    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        return resolver.apply(
                Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload()
        );
    }
}