package com.utp.ProyectoMarcos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * CONTROLADOR QUE SIRVE EL FRONTEND REACT (SPA).
 * El frontend ahora es una Single Page Application generada con
 * React + Vite (ver /frontend-react-source). El build de esa app
 * vive en src/main/resources/static/index.html + /assets/**.
 * Todas las rutas "de página" hacen forward a index.html; React Router
 * (BrowserRouter) es quien decide, en el navegador, qué componente
 * renderizar según la URL solicitada.
 */
@Controller
public class PageController {

    // Cualquier ruta bajo /Clinica/pages/** (las que ya usaban los <a href> y los scripts originales)
    @GetMapping("/Clinica/pages/**")
    public String clinicaPages() {
        return "forward:/index.html";
    }

    // Ruta raíz
    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }

    // Alias cortos (compatibles con los que ya existían)
    @GetMapping("/index")
    public String inicio() {
        return "forward:/index.html";
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/index.html";
    }

    @GetMapping("/register")
    public String register() {
        return "forward:/index.html";
    }

    @GetMapping("/mis-citas")
    public String misCitas() {
        return "forward:/index.html";
    }

    @GetMapping("/mi-perfil")
    public String miPerfil() {
        return "forward:/index.html";
    }

    @GetMapping("/doctor")
    public String doctor() {
        return "forward:/index.html";
    }

    @GetMapping("/nuestros-doctores")
    public String nuestrosDoctores() {
        return "forward:/index.html";
    }

    @GetMapping("/nosotros")
    public String nosotros() {
        return "forward:/index.html";
    }

    @GetMapping("/consejos-de-salud")
    public String consejosSalud() {
        return "forward:/index.html";
    }

    @GetMapping("/admin")
    public String admin() {
        return "forward:/index.html";
    }

    @GetMapping("/admin-login")
    public String adminLogin() {
        return "forward:/index.html";
    }
}
