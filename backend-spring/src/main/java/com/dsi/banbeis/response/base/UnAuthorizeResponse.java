package com.dsi.banbeis.response.base;

import org.springframework.http.HttpStatus;

import java.io.Serializable;

/*
{
    "timestamp": 1563684770034,
    "status": 500,
    "error": "Internal Server ApiError",
    "exception": "javax.servlet.ServletException",
    "message": "Missing or invalid Authorization header.",
    "path": "/api/v1/hello"
}
 */

public class UnAuthorizeResponse extends ApiResponse implements Serializable {
    private String path;
    private Object data;
    public UnAuthorizeResponse(HttpStatus httpStatus, String message, String path){
        super(false);
        super.status = httpStatus.value();
        super.message = message;
        this.path = path;
        this.data = null;
    }


    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
