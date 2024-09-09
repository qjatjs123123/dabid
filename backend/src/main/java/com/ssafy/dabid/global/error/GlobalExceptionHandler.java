package com.ssafy.dabid.global.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e){
        ErrorResponse response = ErrorResponse.builder()
                .code("Illegal Argument")
                .message(e.getMessage())
                .build();

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @ExceptionHandler(IllegalStateException.class)
    protected ResponseEntity<?> handleIllegalStateException(IllegalStateException e){

    }

    @ExceptionHandler(NullPointerException.class)
    protected ResponseEntity<?> handleNullPointerException(NullPointerException e){

    }
}
