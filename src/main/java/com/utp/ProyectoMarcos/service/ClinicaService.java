package com.utp.ProyectoMarcos.service;

import com.utp.ProyectoMarcos.dto.CitaRequest;
import com.utp.ProyectoMarcos.dto.PacienteRequest;
import com.utp.ProyectoMarcos.model.Cita;
import com.utp.ProyectoMarcos.model.Paciente;
import com.utp.ProyectoMarcos.repository.CitaRepository;
import com.utp.ProyectoMarcos.repository.PacienteRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClinicaService {

    private final PacienteRepository pacienteRepo;
    private final CitaRepository citaRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public ClinicaService(PacienteRepository pacienteRepo, CitaRepository citaRepo) {
        this.pacienteRepo = pacienteRepo;
        this.citaRepo = citaRepo;
    }

    // ── PACIENTES ──────────────────────────────────────────────────

    public Paciente registrar(PacienteRequest dto) {
        if (pacienteRepo.existsByCorreo(dto.getCorreo())) {
            throw new RuntimeException("Ya existe una cuenta con ese correo.");
        }
        Paciente p = new Paciente();
        p.setNombres(dto.getNombres());
        p.setApellidos(dto.getApellidos());
        p.setDni(dto.getDni());
        p.setTelefono(dto.getTelefono());
        p.setCorreo(dto.getCorreo());
        p.setPassword(encoder.encode(dto.getPassword()));
        return pacienteRepo.save(p);
    }

    public Paciente loginPaciente(String correo, String password) {
        Paciente p = pacienteRepo.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Correo o contraseña incorrectos."));
        if (!encoder.matches(password, p.getPassword())) {
            throw new RuntimeException("Correo o contraseña incorrectos.");
        }
        return p;
    }

    public boolean existeCorreo(String correo) {
        return pacienteRepo.existsByCorreo(correo);
    }

    public Paciente getPerfil(String correo) {
        return pacienteRepo.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado."));
    }

    public Paciente actualizarPerfil(String correoActual, String nombres, String apellidos,
                                        String dni, String telefono, String correoNuevo,
                                        String passwordNueva) {
        Paciente p = pacienteRepo.findByCorreo(correoActual)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado."));

        if (!correoNuevo.equals(correoActual) && pacienteRepo.existsByCorreo(correoNuevo)) {
            throw new RuntimeException("Ese correo ya está registrado por otro usuario.");
        }

        p.setNombres(nombres);
        p.setApellidos(apellidos);
        p.setDni(dni);
        p.setTelefono(telefono);
        p.setCorreo(correoNuevo);

        if (passwordNueva != null && !passwordNueva.isEmpty()) {
            if (passwordNueva.length() < 6) {
                throw new RuntimeException("La contraseña nueva debe tener al menos 6 caracteres.");
            }
            p.setPassword(encoder.encode(passwordNueva));
        }
        return pacienteRepo.save(p);
    }

    public void cambiarPassword(String correo, String nuevaPassword) {
        Paciente p = pacienteRepo.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado."));
        p.setPassword(encoder.encode(nuevaPassword));
        pacienteRepo.save(p);
    }

    // ── CITAS ──────────────────────────────────────────────────────

    public Cita guardarCita(CitaRequest dto) {
        Paciente paciente = pacienteRepo.findByCorreo(dto.getCorreo())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado."));

        String medicoNombre = dto.getDoctor().replaceAll("[^\\x00-\\x7F]", "").trim();
        if (medicoNombre.isEmpty()) {
            throw new RuntimeException("El nombre del médico no es válido.");
        }

        try {
            Cita cita = new Cita();
            cita.setPaciente(paciente);
            cita.setMedicoNombre(medicoNombre);
            cita.setEspecialidad(dto.getEspecialidad());
            cita.setFecha(LocalDate.parse(dto.getFecha()));
            cita.setHora(LocalTime.parse(dto.getHora()));
            cita.setMotivo(dto.getMotivo());
            cita.setEstado("pendiente");
            cita.setComentario("");
            return citaRepo.save(cita);
        } catch (Exception e) {
            throw new RuntimeException("Fecha u hora con formato inválido.");
        }
    }

    public List<Cita> misCitas(String correo) {
        return citaRepo.findByPacienteCorreoOrderByFechaDescHoraDesc(correo.trim());
    }

    public List<Cita> citasDoctor(String nombre) {
        String nombreLimpio = nombre.replaceAll("[^\\x00-\\x7F]", "").trim();
        return citaRepo.findByMedicoNombreOrderByFechaAscHoraAsc(nombreLimpio);
    }

    public Cita actualizarEstadoCita(Long id, String estado) {
        List<String> permitidos = List.of("pendiente", "confirmada", "atendida");
        if (!permitidos.contains(estado)) {
            throw new RuntimeException("Estado no permitido. Use: pendiente, confirmada o atendida.");
        }
        Cita cita = citaRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada."));
        cita.setEstado(estado);
        return citaRepo.save(cita);
    }

    public Cita editarCita(Long id, String fechaStr, String horaStr, String motivo) {
        Cita cita = citaRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada."));
        try {
            cita.setFecha(LocalDate.parse(fechaStr));
            cita.setHora(LocalTime.parse(horaStr));
            cita.setMotivo(motivo);
            return citaRepo.save(cita);
        } catch (Exception e) {
            throw new RuntimeException("Fecha u hora con formato inválido.");
        }
    }

    public void eliminarCita(Long id) {
        if (!citaRepo.existsById(id)) {
            throw new RuntimeException("Cita no encontrada.");
        }
        citaRepo.deleteById(id);
    }

    public Cita guardarComentario(Long id, String comentario) {
        Cita cita = citaRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada."));
        cita.setComentario(comentario);
        return citaRepo.save(cita);
    }

    public List<Cita> historialCitas(String paciente, String medico, String fecha) {
        boolean filtroPaciente = paciente != null && !paciente.isBlank();
        boolean filtroMedico   = medico != null && !medico.isBlank();
        boolean filtroFecha    = fecha != null && !fecha.isBlank();

        try {
            if (filtroFecha) {
                return citaRepo.findByFecha(LocalDate.parse(fecha));
            } else if (filtroPaciente && filtroMedico) {
                return citaRepo.findByPacienteAndMedico(paciente, medico);
            } else if (filtroPaciente) {
                return citaRepo.findByPacienteNombreContaining(paciente);
            } else if (filtroMedico) {
                return citaRepo.findByMedicoNombreContaining(medico);
            } else {
                return citaRepo.findAllWithPacienteOrderByFechaDesc();
            }
        } catch (Exception e) {
            throw new RuntimeException("Error en los filtros: " + e.getMessage());
        }
    }
}