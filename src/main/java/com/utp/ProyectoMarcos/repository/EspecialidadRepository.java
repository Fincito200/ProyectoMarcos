package com.utp.ProyectoMarcos.repository;

import com.utp.ProyectoMarcos.model.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EspecialidadRepository extends JpaRepository<Especialidad, Long> {
    List<Especialidad> findAllByOrderByNombreAsc();
    List<Especialidad> findByActivaTrueOrderByNombreAsc();
    Optional<Especialidad> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}