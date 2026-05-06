package com.utp.ProyectoMarcos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador que redirige las rutas del frontend a sus páginas HTML en /static/
 * Permite acceder a las páginas directamente sin escribir .html
 */
@Controller
public class PageController {

    // Ruta raíz redirige a inicio
    @GetMapping("/")
    public String index() {
        return "forward:/Clinica/pages/inicio.html";
    }

    @GetMapping("/inicio")
    public String inicio() {
        return "forward:/Clinica/pages/inicio.html";
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/Clinica/pages/login.html";
    }

    @GetMapping("/register")
    public String register() {
        return "forward:/Clinica/pages/register.html";
    }

    @GetMapping("/mis-citas")
    public String misCitas() {
        return "forward:/Clinica/pages/mis-citas.html";
    }

    @GetMapping("/doctor")
    public String doctor() {
        return "forward:/Clinica/pages/doctor.html";
    }

    @GetMapping("/nuestros-doctores")
    public String nuestrosDoctores() {
        return "forward:/Clinica/pages/nuestros-doctores.html";
    }

    @GetMapping("/nosotros")
    public String nosotros() {
        return "forward:/Clinica/pages/nosotros.html";
    }

    @GetMapping("/consejos-de-salud")
    public String consejosSalud() {
        return "forward:/Clinica/pages/consejos-de-salud.html";
    }
}
