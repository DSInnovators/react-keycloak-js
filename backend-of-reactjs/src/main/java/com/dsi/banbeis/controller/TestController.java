package com.dsi.banbeis.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
/*@CrossOrigin("*")*/
/*@RequestMapping("/test")*/
public class TestController {

    @GetMapping("test")
    public @ResponseBody String get(){
        return  "Hello";
    }

    @GetMapping(value = "books/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String
    all() {
/*		configCommonAttributes(model);
		model.addAttribute("books", bookRepository.readAll());*/
        //return  bookRepository.readAll();

        return "hello world";
    }
}
