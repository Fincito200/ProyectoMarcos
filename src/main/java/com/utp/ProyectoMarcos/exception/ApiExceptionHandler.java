package com.utp.ProyectoMarcos.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Convierte errores de validación (@Valid) y RuntimeException
 * en respuestas JSON claras con código HTTP 400.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    /**
     * Captura errores de @Valid / @NotBlank / @Positive / @Min / @Email etc.
     * Devuelve un JSON con el campo y el mensaje de error por cada campo inválido.
     * Ejemplo de respuesta:
     * {
     *   "nombres": "Los nombres son obligatorios",
     *   "correo":  "El correo no tiene un formato válido"
     * }
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidacion(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errores.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errores);
    }

    /**
     * Captura RuntimeException lanzadas desde el Service.
     * Devuelve: { "ok": false, "msg": "mensaje del error" }
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex) {
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("ok", false);
        resp.put("msg", ex.getMessage());
        return ResponseEntity.badRequest().body(resp);
    }
}