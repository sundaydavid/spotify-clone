package com.spotify.backend.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {

    private final Object data;
    private final Object jwtToken;

    public ApiResponse(Object data, Object jwtToken) {
        this.data = data;
        this.jwtToken = jwtToken;
    }
    
     public ApiResponse(Object data) {
        this.data = data;
        this.jwtToken = null;
    }

    public Object getData() {
        return data;
    }

    public Object getJwtToken() {
        return jwtToken;
    }

    
}
