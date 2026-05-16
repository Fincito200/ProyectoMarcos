package com.utp.ProyectoMarcos.repository;

import com.utp.ProyectoMarcos.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE p.correo = :correo ORDER BY c.fecha DESC, c.hora DESC")
    List<Cita> findByPacienteCorreoOrderByFechaDescHoraDesc(@Param("correo") String correo);

    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE c.medicoNombre = :nombre ORDER BY c.fecha ASC, c.hora ASC")
    List<Cita> findByMedicoNombreOrderByFechaAscHoraAsc(@Param("nombre") String nombre);

    // Para el admin: historial completo ordenado
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p ORDER BY c.fecha DESC, c.hora DESC")
    List<Cita> findAllWithPacienteOrderByFechaDesc();

    // Filtro por nombre o apellido del paciente (búsqueda parcial)
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE LOWER(CONCAT(p.nombres, ' ', p.apellidos)) LIKE LOWER(CONCAT('%', :busqueda, '%')) ORDER BY c.fecha DESC")
    List<Cita> findByPacienteNombreContaining(@Param("busqueda") String busqueda);

    // Filtro por nombre del médico (búsqueda parcial)
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE LOWER(c.medicoNombre) LIKE LOWER(CONCAT('%', :medico, '%')) ORDER BY c.fecha DESC")
    List<Cita> findByMedicoNombreContaining(@Param("medico") String medico);

    // Filtro por fecha exacta
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE c.fecha = :fecha ORDER BY c.hora ASC")
    List<Cita> findByFecha(@Param("fecha") LocalDate fecha);

    // Filtro combinado paciente + médico
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE LOWER(CONCAT(p.nombres, ' ', p.apellidos)) LIKE LOWER(CONCAT('%', :paciente, '%')) AND LOWER(c.medicoNombre) LIKE LOWER(CONCAT('%', :medico, '%')) ORDER BY c.fecha DESC")
    List<Cita> findByPacienteAndMedico(@Param("paciente") String paciente, @Param("medico") String medico);
}