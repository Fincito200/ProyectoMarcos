package com.utp.ProyectoMarcos.config;

import com.utp.ProyectoMarcos.security.ApiAccessDeniedHandler;
import com.utp.ProyectoMarcos.security.ApiAuthenticationEntryPoint;
import com.utp.ProyectoMarcos.security.ClinicaUserDetailsService;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private static final String BASE = "/ProyectoModificado/ProyectoMarcos/Clinica/api";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(ClinicaUserDetailsService uds,
                                                                PasswordEncoder encoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(uds);
        provider.setPasswordEncoder(encoder);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                        ApiAuthenticationEntryPoint entryPoint,
                                                        ApiAccessDeniedHandler deniedHandler) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // recursos estáticos reales (CSS, JS, imágenes) servidos desde /static/Clinica/**
                .requestMatchers("/Clinica/**").permitAll()

                // shell de la SPA de React (index.html + assets del build de Vite)
                .requestMatchers("/", "/index.html", "/assets/**").permitAll()

                // páginas "bonitas" que hacen forward a index.html (React Router resuelve la vista)
                .requestMatchers("/index", "/login", "/register", "/nuestros-doctores",
                                    "/nosotros", "/consejos-de-salud", "/doctor", "/mis-citas",
                                    "/mi-perfil", "/admin", "/admin-login").permitAll()

                .requestMatchers(BASE + "/login.php", BASE + "/register.php",
                                    BASE + "/verificar_correo.php",
                                    BASE + "/listar_especialidades.php",
                                    BASE + "/listar_medicos.php").permitAll()
                .requestMatchers(BASE + "/admin/login_admin.php").permitAll()

                // solo ADMIN
                .requestMatchers(BASE + "/admin/**").hasRole("ADMIN")

                // solo MEDICO (o admin, si quieres que también audite)
                .requestMatchers(BASE + "/citas_doctor.php",
                                    BASE + "/actualizar_estado.php",
                                    BASE + "/guardar_comentario.php").hasAnyRole("MEDICO", "ADMIN")

                // resto: cualquier usuario autenticado (paciente, médico o admin)
                .anyRequest().authenticated()
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(entryPoint)
                .accessDeniedHandler(deniedHandler)
            )
            .build();
    }
}