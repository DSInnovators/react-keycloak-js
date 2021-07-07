package com.dsi.banbeis.controller;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(path = "/keycloak",produces = MediaType.APPLICATION_JSON_VALUE)
public class KeycloakAuthController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${keycloak-user-info-uri}")
    private String keycloakUserInfo;

    @Autowired
    private Keycloak keycloak;



   /* @Autowired
    private KeycloakRestService  keycloakRestService;


    @PostMapping
    public String getToken(String username, String password) {
        return keycloakRestService.login(username,password);
    }

    */
    @GetMapping("/create")
    public String createUser(){

        List<RealmRepresentation> relams = keycloak.realms().findAll();

        RealmResource realmResource = keycloak.realm("BANBEIS");

        UserRepresentation user =
                createUser("akash","akash073@gmail.com");

        UsersResource users = realmResource.users();
        users.create(user);

        return "OK";
    }

    private UserRepresentation createUser(String userName,String email){
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(userName);
        userRepresentation.setEmail(email);
        return userRepresentation;
    }

    @GetMapping
    public String getUserInfo(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Authorization", token);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(null, headers);
        return restTemplate.postForObject(keycloakUserInfo, request, String.class);
    }
}
