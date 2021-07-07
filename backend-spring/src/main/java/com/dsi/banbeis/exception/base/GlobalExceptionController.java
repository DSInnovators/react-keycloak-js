package com.dsi.banbeis.exception.base;


import com.dsi.banbeis.response.base.ErrorResponse;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice(basePackages ={"com.dsi.banbeis.controller"})
public class GlobalExceptionController {

    @ExceptionHandler(Exception.class)
    public Object handleError405(HttpServletRequest request, Exception e)   {

        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        String message = e.getMessage();

        ErrorResponse errorResponse = new ErrorResponse(httpStatus,message);
        String jsonResponse = new Gson().toJson(errorResponse);
        return ResponseEntity.status(httpStatus).contentType(MediaType.parseMediaType("application/json;charset=UTF-8")).body(jsonResponse);

    }
}
