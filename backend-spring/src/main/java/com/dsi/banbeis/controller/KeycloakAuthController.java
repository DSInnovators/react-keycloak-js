package com.dsi.banbeis.controller;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
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

    private static final String SERVER_URL = "http://localhost:8000/auth";
     private static final String REALM = "master";
    private static final String USERNAME = "admin";
    private static final String PASSWORD = "admin";
    private static final String CLIENT_ID = "admin-cli";
    private static final String CLIENT_SECRET = "ae10a623-c53b-450d-8563-fea4e3e3c554";


    @GetMapping("/create")
    public String createUser(){

        Keycloak keycloak = KeycloakBuilder
                .builder()
                .serverUrl(SERVER_URL)
                .realm(REALM)
                .username(USERNAME)
                .password(PASSWORD)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_SECRET)
                //.grantType("password")
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();

        //https://github.com/keycloak/keycloak/blob/master/testsuite/integration-arquillian/tests/base/src/test/java/org/keycloak/testsuite/admin/realm/RealmTest.java
        List<RealmRepresentation> realms = keycloak.realms().findAll();

       /*

        UserRepresentation user =
                createUser("akash","akash073@gmail.com");

        UsersResource users = realmResource.users();
        users.create(user);*/

       /*
       List clientRepresentations=keycloak.realm("MY_REALM").clients().findByClientId("my_app"); ClientRepresentation representation=clientRepresentations.get(0);
ClientResource resource=keycloak.realm("MY_REALM").clients().get(representation.getId());
       */
        RealmResource realmResource = keycloak.realm("BANBEIS");

/*        org.keycloak.representations.idm.ClientRepresentation clientRepresentation
        =realmResource.clients().get("27f7c2e3-f2e7-4361-956b-ae6761d64fcf");*/



     /*   Keycloak keycloak = KeycloakBuilder
                .builder()
                .serverUrl(SERVER_URL)
                .realm(REALM)
                .username(USERNAME)
                .password(PASSWORD)
                .clientId(CLIENT_ID)
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();*/

       /* UsersResource usersResource = keycloak.realm(REALM).users();
        UserResource userResource = usersResource.get("27f7c2e3-f2e7-4361-956b-ae6761d64fcf");
        System.out.println(userResource.toRepresentation().getEmail());

        ClientResource resource= realmResource.clients().get("27f7c2e3-f2e7-4361-956b-ae6761d64fcf");

        List sessions=resource.getUserSessions(0,1000);*/

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
