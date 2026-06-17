package com.medday.medday_api.Exception;

public class ErroResponse extends RuntimeException {
    public ErroResponse(String message) {
        super(message);
    }
}
