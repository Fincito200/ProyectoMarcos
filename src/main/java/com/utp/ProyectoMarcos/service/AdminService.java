package com.utp.ProyectoMarcos.service;

import com.utp.ProyectoMarcos.dto.EspecialidadRequest;
import com.utp.ProyectoMarcos.dto.MedicoRequest;
import com.utp.ProyectoMarcos.model.Admin;
import com.utp.ProyectoMarcos.model.Especialidad;
import com.utp.ProyectoMarcos.model.Medico;
import com.utp.ProyectoMarcos.repository.AdminRepository;
import com.utp.ProyectoMarcos.repository.EspecialidadRepository;
import com.utp.ProyectoMarcos.repository.MedicoRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepo;
    private final MedicoRepository medicoRepo;
    private final EspecialidadRepository especialidadRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AdminService(AdminRepository adminRepo,
                        MedicoRepository medicoRepo,
                        EspecialidadRepository especialidadRepo) {
        this.adminRepo = adminRepo;
        this.medicoRepo = medicoRepo;
        this.especialidadRepo = especialidadRepo;
    }

    // ADMIN LOGIN

    public Admin loginAdmin(String correo, String password) {
        Admin a = adminRepo.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Correo o contraseña incorrectos."));
        if (!encoder.matches(password, a.getPassword())) {
            throw new RuntimeException("Correo o contraseña incorrectos.");
        }
        return a;
    }

    public void cambiarPasswordAdmin(String correo, String passwordActual, String passwordNueva) {
        Admin a = adminRepo.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Admin no encontrado."));
        if (!encoder.matches(passwordActual, a.getPassword())) {
            throw new RuntimeException("Contraseña actual incorrecta.");
        }
        if (passwordNueva.length() < 6) {
            throw new RuntimeException("La nueva contraseña debe tener al menos 6 caracteres.");
        }
        a.setPassword(encoder.encode(passwordNueva));
        adminRepo.save(a);
    }

    // MÉDICOS

    public List<Medico> listarMedicos() {
        return medicoRepo.findAllByOrderByNombreAsc();
    }

    public Medico crearMedico(MedicoRequest dto) {
        if (medicoRepo.existsByCorreo(dto.getCorreo())) {
            throw new RuntimeException("Ya existe un médico con ese correo.");
        }
        if (dto.getPassword() == null || dto.getPassword().isEmpty()) {
            throw new RuntimeException("La contraseña es obligatoria al crear un médico.");
        }
        Medico m = new Medico();
        m.setNombre(dto.getNombre());
        m.setCorreo(dto.getCorreo());
        m.setPassword(encoder.encode(dto.getPassword()));
        m.setEspecialidad(dto.getEspecialidad());
        return medicoRepo.save(m);
    }

    public Medico editarMedico(Long id, MedicoRequest dto) {
        Medico m = medicoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado."));

        if (!dto.getCorreo().equals(m.getCorreo()) && medicoRepo.existsByCorreo(dto.getCorreo())) {
            throw new RuntimeException("Ese correo ya está en uso por otro médico.");
        }

        m.setNombre(dto.getNombre());
        m.setCorreo(dto.getCorreo());
        m.setEspecialidad(dto.getEspecialidad());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            m.setPassword(encoder.encode(dto.getPassword()));
        }
        return medicoRepo.save(m);
    }

    public void eliminarMedico(Long id) {
        if (!medicoRepo.existsById(id)) {
            throw new RuntimeException("Médico no encontrado.");
        }
        medicoRepo.deleteById(id);
    }

    // ESPECIALIDADES

    public List<Especialidad> listarEspecialidades() {
        return especialidadRepo.findAllByOrderByNombreAsc();
    }

    public Especialidad crearEspecialidad(EspecialidadRequest dto) {
        if (especialidadRepo.existsByNombre(dto.getNombre())) {
            throw new RuntimeException("Ya existe una especialidad con ese nombre.");
        }
        Especialidad e = new Especialidad();
        e.setNombre(dto.getNombre());
        e.setDescripcion(dto.getDescripcion());
        e.setActiva(dto.getActiva() != null ? dto.getActiva() : true);
        return especialidadRepo.save(e);
    }

    public Especialidad editarEspecialidad(Long id, EspecialidadRequest dto) {
        Especialidad e = especialidadRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada."));

        if (!dto.getNombre().equals(e.getNombre()) && especialidadRepo.existsByNombre(dto.getNombre())) {
            throw new RuntimeException("Ya existe una especialidad con ese nombre.");
        }

        e.setNombre(dto.getNombre());
        e.setDescripcion(dto.getDescripcion());
        e.setActiva(dto.getActiva() != null ? dto.getActiva() : e.getActiva());
        return especialidadRepo.save(e);
    }

    public void eliminarEspecialidad(Long id) {
        if (!especialidadRepo.existsById(id)) {
            throw new RuntimeException("Especialidad no encontrada.");
        }
        especialidadRepo.deleteById(id);
    }
}