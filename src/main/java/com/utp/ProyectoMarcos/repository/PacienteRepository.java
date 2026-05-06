package com.utp.ProyectoMarcos.repository;

import com.utp.ProyectoMarcos.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Optional<Paciente> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
