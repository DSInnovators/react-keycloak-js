package com.dsi.banbeis.config.keycloakclient;

import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakClientConfig {

  /*  *//*@Value("${keycloak.credentials.secret}")
    private String secretKey;*//*
    @Value("${keycloak.resource}")
    private String clientId;
    @Value("${keycloak.auth-server-url}")
    private String authUrl;
    @Value("${keycloak.realm}")
    private String realm;

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .grantType(CLIENT_CREDENTIALS)
                .serverUrl(authUrl)
                .realm(realm)
                .clientId(clientId)
                //.clientSecret(secretKey)
                .build();
    }*/
}
