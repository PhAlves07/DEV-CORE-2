package com.agrestesoluciona.backend.exception;

// Map permite retornar pares chave-valor, comum em respostas simples da API.
import java.util.HashMap;
// Map permite retornar pares chave-valor, comum em respostas simples da API.
import java.util.Map;

// Classe HTTP usada para controlar status e corpo das respostas da API.
import org.springframework.http.HttpStatus;
// Classe HTTP usada para controlar status e corpo das respostas da API.
import org.springframework.http.ResponseEntity;
// Import traz uma classe/anotacao necessaria para este arquivo Java.
import org.springframework.web.bind.MethodArgumentNotValidException;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.ExceptionHandler;
// Anotacao Spring MVC usada para criar endpoints e receber dados HTTP.
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice

public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    
    public ResponseEntity<Map<String, String>> handleRuntimeException(
            RuntimeException ex
    ) {

        Map<String, String> error =
                new HashMap<>();

        error.put(
                "message",
                ex.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    
    public ResponseEntity<Map<String, String>> handleValidationException(
            MethodArgumentNotValidException ex
    ) {

        Map<String, String> errors =
                new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> {

                    errors.put(
                            error.getField(),
                            error.getDefaultMessage()
                    );
                });

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errors);
    }
}