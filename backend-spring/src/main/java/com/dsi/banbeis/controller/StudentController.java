package com.dsi.banbeis.controller;

import com.dsi.banbeis.entity.Student;
import com.dsi.banbeis.response.base.ListResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "/student", produces = MediaType.APPLICATION_JSON_VALUE)
public class StudentController {

    Logger LOGGER = LoggerFactory.getLogger(StudentController.class);

    @GetMapping(path = "/all")
    public ListResponse<List<Student>> index(HttpServletRequest httpServletRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        LOGGER.info(currentPrincipalName);
        /*List<SimpleGrantedAuthority> grantedAuthorities = authentication.getAuthorities().stream().map(authority -> new SimpleGrantedAuthority(authority.getAuthority())).collect(Collectors.toList()); // (1)

        KeycloakPrincipal principal = (KeycloakPrincipal)authentication.getPrincipal();
        System.out.println(principal);

        Map<String, Object> customProperty = principal.getKeycloakSecurityContext().getToken().getOtherClaims();

        */



        Student student  = new Student();
        student.setId(1);
        student.setName("AKASH");


        List<Student> students = Arrays.asList(student);


        return new ListResponse(students,Student.class);
    }
}
