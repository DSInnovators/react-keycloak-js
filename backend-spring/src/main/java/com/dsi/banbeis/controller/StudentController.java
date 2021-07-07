package com.dsi.banbeis.controller;

import com.dsi.banbeis.entity.Student;
import com.dsi.banbeis.response.base.ListResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "/student")
public class StudentController {

    @GetMapping(path = "/all")
    public ListResponse<List<Student>> index(HttpServletRequest httpServletRequest) {
        Student student  = new Student();
        student.setId(1);
        student.setName("AKASH");


        List<Student> students = Arrays.asList(student);


        return new ListResponse(students,Student.class);
    }
}
