package com.utp.ProyectoMarcos.controller;

import com.utp.ProyectoMarcos.model.*;
import com.utp.ProyectoMarcos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/ProyectoModificado/ProyectoMarcos/Clinica/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired private AdminRepository adminRepo;
    @Autowired private MedicoRepository medicoRepo;
    @Autowired private EspecialidadRepository especialidadRepo;
    @Autowired private CitaRepository citaRepo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // ── LOGIN ADMIN ──────────────────────────────────────────────
    @PostMapping("/login_admin.php")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Map<String, String> body) {
        String correo   = body.getOrDefault("correo", "").trim();
        String password = body.getOrDefault("password", "");
        Map<String, Object> resp = new LinkedHashMap<>();

        Optional<Admin> opt = adminRepo.findByCorreo(correo);
        if (opt.isPresent() && encoder.matches(password, opt.get().getPassword())) {
            resp.put("ok", true);
            resp.put("nombre", opt.get().getNombre());
            resp.put("correo", correo);
        } else {
            resp.put("ok", false);
            resp.put("msg", "Correo o contraseña incorrectos.");
        }
        return ResponseEntity.ok(resp);
    }

    // ── CAMBIAR PASSWORD ADMIN ───────────────────────────────────
    @PostMapping("/cambiar_password_admin.php")
    public ResponseEntity<Map<String, Object>> cambiarPasswordAdmin(@RequestBody Map<String, String> body) {
        String correo      = body.getOrDefault("correo", "").trim();
        String passwordAct = body.getOrDefault("password_actual", "");
        String passwordNew = body.getOrDefault("password_nueva", "");

        Optional<Admin> opt = adminRepo.findByCorreo(correo);
        if (opt.isEmpty() || !encoder.matches(passwordAct, opt.get().getPassword())) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Contraseña actual incorrecta."));
        }
        if (passwordNew.length() < 6) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "La nueva contraseña debe tener al menos 6 caracteres."));
        }
        Admin a = opt.get();
        a.setPassword(encoder.encode(passwordNew));
        adminRepo.save(a);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    // ════════════════════════════════════════════════════════════
    //  MÉDICOS
    // ════════════════════════════════════════════════════════════

    @GetMapping("/listar_medicos.php")
    public ResponseEntity<Map<String, Object>> listarMedicos() {
        List<Medico> lista = medicoRepo.findAllByOrderByNombreAsc();
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Medico m : lista) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", m.getId());
            item.put("nombre", m.getNombre());
            item.put("correo", m.getCorreo());
            item.put("especialidad", m.getEspecialidad());
            resultado.add(item);
        }
        return ResponseEntity.ok(Map.of("ok", true, "medicos", resultado));
    }

    @PostMapping("/crear_medico.php")
    public ResponseEntity<Map<String, Object>> crearMedico(@RequestBody Map<String, String> body) {
        String nombre      = body.getOrDefault("nombre", "").trim();
        String correo      = body.getOrDefault("correo", "").trim();
        String password    = body.getOrDefault("password", "");
        String especialidad = body.getOrDefault("especialidad", "").trim();

        if (nombre.isEmpty() || correo.isEmpty() || password.isEmpty() || especialidad.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Completa todos los campos."));
        }
        if (medicoRepo.existsByCorreo(correo)) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Ya existe un médico con ese correo."));
        }
        if (password.length() < 6) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "La contraseña debe tener al menos 6 caracteres."));
        }

        Medico m = new Medico();
        m.setNombre(nombre);
        m.setCorreo(correo);
        m.setPassword(encoder.encode(password));
        m.setEspecialidad(especialidad);
        medicoRepo.save(m);

        return ResponseEntity.ok(Map.of("ok", true, "msg", "Médico creado correctamente."));
    }

    @PostMapping("/editar_medico.php")
    public ResponseEntity<Map<String, Object>> editarMedico(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        String nombre       = ((String) body.getOrDefault("nombre", "")).trim();
        String correo       = ((String) body.getOrDefault("correo", "")).trim();
        String especialidad = ((String) body.getOrDefault("especialidad", "")).trim();
        String passwordNew  = (String) body.getOrDefault("password_nueva", "");

        if (id == 0 || nombre.isEmpty() || correo.isEmpty() || especialidad.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Datos incompletos."));
        }

        Optional<Medico> opt = medicoRepo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Médico no encontrado."));
        }

        // Si el correo cambió, verificar que no esté en uso
        Medico m = opt.get();
        if (!correo.equals(m.getCorreo()) && medicoRepo.existsByCorreo(correo)) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Ese correo ya está en uso por otro médico."));
        }

        m.setNombre(nombre);
        m.setCorreo(correo);
        m.setEspecialidad(especialidad);
        if (!passwordNew.isEmpty()) {
            if (passwordNew.length() < 6) {
                return ResponseEntity.ok(Map.of("ok", false, "msg", "La contraseña debe tener al menos 6 caracteres."));
            }
            m.setPassword(encoder.encode(passwordNew));
        }
        medicoRepo.save(m);

        return ResponseEntity.ok(Map.of("ok", true, "msg", "Médico actualizado correctamente."));
    }

    @PostMapping("/eliminar_medico.php")
    public ResponseEntity<Map<String, Object>> eliminarMedico(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        if (id == 0 || !medicoRepo.existsById(id)) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Médico no encontrado."));
        }
        medicoRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("ok", true, "msg", "Médico eliminado correctamente."));
    }

    // ════════════════════════════════════════════════════════════
    //  ESPECIALIDADES
    // ════════════════════════════════════════════════════════════

    @GetMapping("/listar_especialidades.php")
    public ResponseEntity<Map<String, Object>> listarEspecialidades() {
        List<Especialidad> lista = especialidadRepo.findAllByOrderByNombreAsc();
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Especialidad e : lista) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", e.getId());
            item.put("nombre", e.getNombre());
            item.put("descripcion", e.getDescripcion() != null ? e.getDescripcion() : "");
            item.put("activa", e.getActiva());
            resultado.add(item);
        }
        return ResponseEntity.ok(Map.of("ok", true, "especialidades", resultado));
    }

    @PostMapping("/crear_especialidad.php")
    public ResponseEntity<Map<String, Object>> crearEspecialidad(@RequestBody Map<String, String> body) {
        String nombre      = body.getOrDefault("nombre", "").trim();
        String descripcion = body.getOrDefault("descripcion", "").trim();

        if (nombre.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "El nombre es obligatorio."));
        }
        if (especialidadRepo.existsByNombre(nombre)) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Ya existe una especialidad con ese nombre."));
        }

        Especialidad e = new Especialidad();
        e.setNombre(nombre);
        e.setDescripcion(descripcion);
        e.setActiva(true);
        especialidadRepo.save(e);

        return ResponseEntity.ok(Map.of("ok", true, "msg", "Especialidad creada correctamente."));
    }

    @PostMapping("/editar_especialidad.php")
    public ResponseEntity<Map<String, Object>> editarEspecialidad(@RequestBody Map<String, Object> body) {
        Long id            = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        String nombre      = ((String) body.getOrDefault("nombre", "")).trim();
        String descripcion = ((String) body.getOrDefault("descripcion", "")).trim();
        Boolean activa     = body.containsKey("activa") ? (Boolean) body.get("activa") : true;

        if (id == 0 || nombre.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Datos incompletos."));
        }

        Optional<Especialidad> opt = especialidadRepo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Especialidad no encontrada."));
        }

        Especialidad e = opt.get();
        // Verificar nombre único si cambió
        if (!nombre.equals(e.getNombre()) && especialidadRepo.existsByNombre(nombre)) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Ya existe una especialidad con ese nombre."));
        }

        e.setNombre(nombre);
        e.setDescripcion(descripcion);
        e.setActiva(activa);
        especialidadRepo.save(e);

        return ResponseEntity.ok(Map.of("ok", true, "msg", "Especialidad actualizada correctamente."));
    }

    @PostMapping("/eliminar_especialidad.php")
    public ResponseEntity<Map<String, Object>> eliminarEspecialidad(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        if (id == 0 || !especialidadRepo.existsById(id)) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Especialidad no encontrada."));
        }
        especialidadRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("ok", true, "msg", "Especialidad eliminada correctamente."));
    }

    // ════════════════════════════════════════════════════════════
    //  HISTORIAL DE CITAS (con filtros)
    // ════════════════════════════════════════════════════════════

    @GetMapping("/historial_citas.php")
    public ResponseEntity<Map<String, Object>> historialCitas(
            @RequestParam(required = false, defaultValue = "") String paciente,
            @RequestParam(required = false, defaultValue = "") String medico,
            @RequestParam(required = false, defaultValue = "") String fecha) {

        List<Cita> citas;
        DateTimeFormatter fechaFmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        try {
            boolean filtroPaciente = !paciente.isBlank();
            boolean filtroMedico   = !medico.isBlank();
            boolean filtroFecha    = !fecha.isBlank();

            if (filtroFecha) {
                citas = citaRepo.findByFecha(LocalDate.parse(fecha));
            } else if (filtroPaciente && filtroMedico) {
                citas = citaRepo.findByPacienteAndMedico(paciente, medico);
            } else if (filtroPaciente) {
                citas = citaRepo.findByPacienteNombreContaining(paciente);
            } else if (filtroMedico) {
                citas = citaRepo.findByMedicoNombreContaining(medico);
            } else {
                citas = citaRepo.findAllWithPacienteOrderByFechaDesc();
            }
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Error en los filtros: " + e.getMessage()));
        }

        List<Map<String, Object>> lista = new ArrayList<>();
        for (Cita c : citas) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("medico_nombre", c.getMedicoNombre());
            m.put("especialidad", c.getEspecialidad());
            m.put("fecha_legible", c.getFecha() != null ? c.getFecha().format(fechaFmt) : "");
            m.put("fecha_iso", c.getFecha() != null ? c.getFecha().toString() : "");
            m.put("hora", c.getHora() != null ? c.getHora().toString() : "");
            m.put("motivo", c.getMotivo());
            m.put("estado", c.getEstado());
            m.put("comentario", c.getComentario());
            Paciente p = c.getPaciente();
            m.put("paciente_nombres", p.getNombres());
            m.put("paciente_apellidos", p.getApellidos());
            m.put("paciente_dni", p.getDni());
            m.put("paciente_telefono", p.getTelefono());
            m.put("paciente_correo", p.getCorreo());
            lista.add(m);
        }

        return ResponseEntity.ok(Map.of("ok", true, "citas", lista, "total", lista.size()));
    }
}