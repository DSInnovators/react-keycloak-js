package com.dsi.banbeis.exception.base;


/**
 * Created by DELL on 22-Jul-19.
 */
//@RestControllerAdvice(basePackages ={"com.cnsbd.bsp.api.login","com.cnsbd.bsp.api.v1"})
/*@RestControllerAdvice(basePackages ={"com.company.controller", "com.company.service" ,"com.company.repository"})
public class ApiExceptionHandler {

*//*    @Autowired
    Messages messages;*//*

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private HttpServletRequest request;

    @ResponseBody
    @ExceptionHandler(value = ValidationException.class)
    public ResponseEntity<?> handleException(ValidationException exception) {

        HttpStatus httpStatus = HttpStatus.OK;
        String localeString = request.getHeader("Accept-Language");

        Locale locale = new Locale(localeString);

        //String message = messages.get(exception.getMessage());
        String message = messageSource.getMessage(exception.getMessage(), null, locale);

        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,message);
        Gson gson = new GsonBuilder().serializeNulls().create();
        String jsonResponse = gson.toJson(errorResponse);
        return ResponseEntity.status(httpStatus).contentType(MediaType.parseMediaType("application/json;charset=UTF-8")).body(jsonResponse);
    }

    @ResponseBody
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleException(MethodArgumentNotValidException exception) {

        //HttpStatus httpStatus =

        String message = exception.getBindingResult().getAllErrors().get(0).getDefaultMessage();
       // String message = exception.getMessage();

        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,message);
        Gson gson = new GsonBuilder().serializeNulls().create();
        String jsonResponse = gson.toJson(errorResponse);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.parseMediaType("application/json;charset=UTF-8")).body(jsonResponse);
    }

    *//*@ResponseBody
    @ExceptionHandler(value = TokenExpiredException.class)
    public ResponseEntity<?> handleException(TokenExpiredException exception) {

        HttpStatus httpStatus = HttpStatus.OK;
        String message = exception.getMessage();

        com.cnsbd.bsp.api.v1.response.base.ErrorResponse errorResponse = new com.cnsbd.bsp.api.v1.response.base.ErrorResponse(HttpStatus.BAD_REQUEST,message);
        Gson gson = new GsonBuilder().serializeNulls().create();
        String jsonResponse = gson.toJson(errorResponse);
        return ResponseEntity.status(httpStatus).contentType(MediaType.parseMediaType("application/json;charset=UTF-8")).body(jsonResponse);
    }*//*
}*/
