package com.utp.ProyectoMarcos.repository;

import com.utp.ProyectoMarcos.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE p.correo = :correo ORDER BY c.fecha DESC, c.hora DESC")
    List<Cita> findByPacienteCorreoOrderByFechaDescHoraDesc(@Param("correo") String correo);

    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE c.medicoNombre = :nombre ORDER BY c.fecha ASC, c.hora ASC")
    List<Cita> findByMedicoNombreOrderByFechaAscHoraAsc(@Param("nombre") String nombre);
}
