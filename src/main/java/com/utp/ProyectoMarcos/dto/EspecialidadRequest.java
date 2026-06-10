package com.utp.ProyectoMarcos.dto;

import jakarta.validation.constraints.*;

public class EspecialidadRequest {

    @NotBlank(message = "El nombre de la especialidad es obligatorio")
    @Size(max = 150, message = "El nombre no puede superar 150 caracteres")
    private String nombre;

    private String descripcion;

    private Boolean activa = true;

    // GETTERS Y SETTERS
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Boolean getActiva() { return activa; }
    public void setActiva(Boolean activa) { this.activa = activa; }
}