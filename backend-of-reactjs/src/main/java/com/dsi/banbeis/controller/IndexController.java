package com.dsi.banbeis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/")
public class IndexController {

    @GetMapping
    public @ResponseBody String get(HttpServletRequest httpServletRequest){
        String sessionId = httpServletRequest.getHeader("session_id");
        HttpSession httpSession = httpServletRequest.getSession();
        return  "Hello" + sessionId;
    }
}
