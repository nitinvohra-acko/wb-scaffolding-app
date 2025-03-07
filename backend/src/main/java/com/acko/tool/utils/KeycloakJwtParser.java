package com.acko.tool.utils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;

import java.io.IOException;
import java.math.BigInteger;
import java.net.URL;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class KeycloakJwtParser {

    private final String keycloakUrl;
    private final String realm;
    private final Map<String, PublicKey> keyCache = new HashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public KeycloakJwtParser(String keycloakUrl, String realm) {
        this.keycloakUrl = keycloakUrl;
        this.realm = realm;
    }

    /**
     * Parse and verify a JWT token issued by Keycloak
     */
    public Claims parseToken(String token) throws Exception {
        // First, let's decode the token without verification to get the header
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid token format");
        }

        // Decode the header
        String headerJson = new String(Base64.getUrlDecoder().decode(parts[0]));
        JsonNode headerNode = objectMapper.readTree(headerJson);
        
        // Get the Key ID (kid) from the header
        String kid = headerNode.get("kid").asText();
        
        // Get the algorithm
        String alg = headerNode.get("alg").asText();
        if (!"RS256".equals(alg)) {
            throw new IllegalArgumentException("Only RS256 algorithm is supported");
        }
        
        // Get the public key for this kid
        PublicKey publicKey = getPublicKey(kid);
        
        // Create a JWT parser with the public key
        JwtParser parser = Jwts.parser()
                .setSigningKey(publicKey)
                .build();
        
        try {
            // Parse and verify the token
            Jws<Claims> jws = parser.parseClaimsJws(token);
            return jws.getBody();
        } catch (SignatureException e) {
            throw new Exception("Token signature verification failed", e);
        }
    }
    
    /**
     * Parse token without verifying the signature (for debugging only)
     */
    public Claims parseTokenWithoutVerification(String token) {
        return Jwts.parser()
                .unsecured()
                .build()
                .parseClaimsJwt(token.substring(0, token.lastIndexOf('.')+1))
                .getBody();
    }

    /**
     * Get the public key from Keycloak's JWKS endpoint
     */
    private PublicKey getPublicKey(String kid) throws Exception {
        // Check if we have this key cached
        if (keyCache.containsKey(kid)) {
            return keyCache.get(kid);
        }
        
        // Fetch the public key from Keycloak's JWKS endpoint
        String jwksUrl = String.format("%s/realms/%s/protocol/openid-connect/certs", keycloakUrl, realm);
        JsonNode jwks = objectMapper.readTree(new URL(jwksUrl));
        JsonNode keys = jwks.get("keys");
        
        for (JsonNode keyInfo : keys) {
            if (kid.equals(keyInfo.get("kid").asText())) {
                PublicKey publicKey = createPublicKey(keyInfo);
                keyCache.put(kid, publicKey);
                return publicKey;
            }
        }
        
        throw new Exception("Could not find public key with kid: " + kid);
    }
    
    /**
     * Create a public key from the JWK data
     */
    private PublicKey createPublicKey(JsonNode keyInfo) throws Exception {
        // JWK format uses base64url encoding without padding
        String modulusBase64 = keyInfo.get("n").asText();
        String exponentBase64 = keyInfo.get("e").asText();
        
        // Decode the modulus and exponent
        byte[] modulusBytes = Base64.getUrlDecoder().decode(modulusBase64);
        byte[] exponentBytes = Base64.getUrlDecoder().decode(exponentBase64);
        
        // Convert to BigInteger
        BigInteger modulus = new BigInteger(1, modulusBytes);
        BigInteger exponent = new BigInteger(1, exponentBytes);
        
        // Create the public key
        RSAPublicKeySpec spec = new RSAPublicKeySpec(modulus, exponent);
        KeyFactory factory = KeyFactory.getInstance("RSA");
        return factory.generatePublic(spec);
    }
    
    /**
     * Example usage
     */
    public static void main(String[] args) {
        try {
            String keycloakUrl = "http://localhost:8080";
            String realm = "master";
            
            KeycloakJwtParser parser = new KeycloakJwtParser(keycloakUrl, realm);
            
            String token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZeE9DZnE0b0RybTNKSUMwV0plT2NDdWRkdFFTR0ViZUZRRno3MFdoc3RJIn0.eyJleHAiOjE3NDEzMzkwMjcsImlhdCI6MTc0MTMwMzAyNywianRpIjoiZDNhODAyNDQtYjdlYy00NGQ5LWEwZTUtNjNkOTg5YWU1MDFmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzaWQiOiIzNWEyMjNhZC0zNGFhLTQwMDAtOTVhZS02OWM1NGEyNWMzYjkiLCJzY29wZSI6InByb2ZpbGUgZW1haWwifQ.HoAzvzNAl5wBvmI4mMHjG9ofF2CgkifFiIRP9tm_r5dOiyWZmWlR2XoHqvQTbM9SvfTeRdG18oUSDNZTD02H_QM6QkEQC47BN-AOYQmqSB-j59seztZAdYF0GXl4jSRn5NbzK1-HvqQMz_q8pIs9hOvFIKPQLXbaJCy1AkyYfzjQwYxwsginF013crQxMDYa8Yz_LbT5Rk46T_SNCtQFSLNKSqDaPdSjro-mM3vwsE2OBDtQ3RQxMR-F7j48ittySdcNCGHxa-ywkSJ0_R9-biqwz0PA30ju5A1D868qtHQZepSK6JrFoPHMjHxlJkeYQvNmiAXJwzyuEahsbuPODw";
            
            // First, let's see what's in the token without verification (for debugging)
//            Claims unverifiedClaims = parser.parseTokenWithoutVerification(token);
//            System.out.println("Token without verification:");
//            System.out.println("Subject: " + unverifiedClaims.getSubject());
//            System.out.println("Issuer: " + unverifiedClaims.getIssuer());
//            System.out.println("Expiration: " + unverifiedClaims.getExpiration());
            
            // Now parse and verify the token
            Claims verifiedClaims = parser.parseToken(token);
            System.out.println("\nVerified token:");
            System.out.println("Subject: " + verifiedClaims.getSubject());
            System.out.println("Issuer: " + verifiedClaims.getIssuer());
            System.out.println("Expiration: " + verifiedClaims.getExpiration());
            
            // Access custom claims
            if (verifiedClaims.containsKey("realm_access")) {
                @SuppressWarnings("unchecked")
                Map<String, Object> realmAccess = (Map<String, Object>) verifiedClaims.get("realm_access");
                @SuppressWarnings("unchecked")
                Iterable<String> roles = (Iterable<String>) realmAccess.get("roles");
                System.out.println("Roles: " + roles);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}