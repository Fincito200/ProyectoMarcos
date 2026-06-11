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

    // PARA EL ADMIN: HISTORIAL COMPLETO ORDENADO
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p ORDER BY c.fecha DESC, c.hora DESC")
    List<Cita> findAllWithPacienteOrderByFechaDesc();

    // FILTRO POR NOMBRE O APELLIDO DEL PACIENTE (BÚSQUEDA PARCIAL)
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE LOWER(CONCAT(p.nombres, ' ', p.apellidos)) LIKE LOWER(CONCAT('%', :busqueda, '%')) ORDER BY c.fecha DESC")
    List<Cita> findByPacienteNombreContaining(@Param("busqueda") String busqueda);

    // FILTRO POR NOMBRE DEL MÉDICO (BÚSQUEDA PARCIAL)
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE LOWER(c.medicoNombre) LIKE LOWER(CONCAT('%', :medico, '%')) ORDER BY c.fecha DESC")
    List<Cita> findByMedicoNombreContaining(@Param("medico") String medico);

    // FILTRO POR FECHA EXACTA
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE c.fecha = :fecha ORDER BY c.hora ASC")
    List<Cita> findByFecha(@Param("fecha") LocalDate fecha);

    // FILTRO COMBINADO PACIENTE + MÉDICO
    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente p WHERE LOWER(CONCAT(p.nombres, ' ', p.apellidos)) LIKE LOWER(CONCAT('%', :paciente, '%')) AND LOWER(c.medicoNombre) LIKE LOWER(CONCAT('%', :medico, '%')) ORDER BY c.fecha DESC")
    List<Cita> findByPacienteAndMedico(@Param("paciente") String paciente, @Param("medico") String medico);
}