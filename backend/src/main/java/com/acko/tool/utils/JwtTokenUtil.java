package com.acko.tool.utils;
import java.math.BigInteger;
import java.net.URL;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.acko.tool.config.properties.KeycloakConfigProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenUtil {
	
	private final KeycloakConfigProperties keycloakConfigProperties;
	
	private static final Map<String, PublicKey> keyCache = new HashMap<>();
	private static final ObjectMapper objectMapper = new ObjectMapper();

    // Parse JWT token and extract claims without verifying signature
	public Claims extractClaims(String token) {
		try {
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

			// Decode the JWT and parse its claims
			JwtParser jwtParser = Jwts.parser().verifyWith(publicKey).build();
			Jwt<JwsHeader, Claims> jwt = jwtParser.parseSignedClaims(token);
			return jwt.getPayload(); // Return the claims part of the token
		} catch (Exception e) {
			log.error("", e);
			throw new RuntimeException("Invalid JWT token", e);
		}
	}
	
	
	/**
     * Get the public key from Keycloak's JWKS endpoint
     */
    public PublicKey getPublicKey(String kid) throws Exception {
        // Check if we have this key cached
        if (keyCache.containsKey(kid)) {
            return keyCache.get(kid);
        }
        
        // Fetch the public key from Keycloak's JWKS endpoint
        String jwksUrl = String.format("%s/realms/%s/protocol/openid-connect/certs", keycloakConfigProperties.getServerUrl(), keycloakConfigProperties.getRealm());
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
    public PublicKey createPublicKey(JsonNode keyInfo) throws Exception {
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

    // Extract the username from the token (assuming it is included in the 'sub' claim)
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Check if the token has expired (based on the 'exp' claim)
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
