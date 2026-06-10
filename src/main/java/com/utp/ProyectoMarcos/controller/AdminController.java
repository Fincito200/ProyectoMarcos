package com.utp.ProyectoMarcos.controller;

import com.utp.ProyectoMarcos.dto.EspecialidadRequest;
import com.utp.ProyectoMarcos.dto.MedicoRequest;
import com.utp.ProyectoMarcos.model.Cita;
import com.utp.ProyectoMarcos.model.Especialidad;
import com.utp.ProyectoMarcos.model.Medico;
import com.utp.ProyectoMarcos.model.Paciente;
import com.utp.ProyectoMarcos.service.AdminService;
import com.utp.ProyectoMarcos.service.ClinicaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/ProyectoModificado/ProyectoMarcos/Clinica/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;
    private final ClinicaService clinicaService;

    public AdminController(AdminService adminService, ClinicaService clinicaService) {
        this.adminService = adminService;
        this.clinicaService = clinicaService;
    }

    // ── AUTH ADMIN ─────────────────────────────────────────────────

    @PostMapping("/login_admin.php")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Map<String, String> body) {
        String correo   = body.getOrDefault("correo", "").trim();
        String password = body.getOrDefault("password", "");
        Map<String, Object> resp = new LinkedHashMap<>();
        try {
            var admin = adminService.loginAdmin(correo, password);
            resp.put("ok", true);
            resp.put("nombre", admin.getNombre());
            resp.put("correo", correo);
        } catch (RuntimeException e) {
            resp.put("ok", false);
            resp.put("msg", e.getMessage());
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/cambiar_password_admin.php")
    public ResponseEntity<Map<String, Object>> cambiarPasswordAdmin(@RequestBody Map<String, String> body) {
        String correo      = body.getOrDefault("correo", "").trim();
        String passwordAct = body.getOrDefault("password_actual", "");
        String passwordNew = body.getOrDefault("password_nueva", "");
        adminService.cambiarPasswordAdmin(correo, passwordAct, passwordNew);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    // ── MÉDICOS ────────────────────────────────────────────────────

    @GetMapping("/listar_medicos.php")
    public ResponseEntity<Map<String, Object>> listarMedicos() {
        List<Medico> lista = adminService.listarMedicos();
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
    public ResponseEntity<Map<String, Object>> crearMedico(@Valid @RequestBody MedicoRequest dto) {
        adminService.crearMedico(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("ok", true, "msg", "Médico creado correctamente."));
    }

    @PostMapping("/editar_medico.php")
    public ResponseEntity<Map<String, Object>> editarMedico(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        if (id == 0) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "msg", "ID inválido."));
        }
        MedicoRequest dto = new MedicoRequest();
        dto.setNombre(((String) body.getOrDefault("nombre", "")).trim());
        dto.setCorreo(((String) body.getOrDefault("correo", "")).trim());
        dto.setEspecialidad(((String) body.getOrDefault("especialidad", "")).trim());
        dto.setPassword((String) body.getOrDefault("password_nueva", ""));

        adminService.editarMedico(id, dto);
        return ResponseEntity.ok(Map.of("ok", true, "msg", "Médico actualizado correctamente."));
    }

    @PostMapping("/eliminar_medico.php")
    public ResponseEntity<Map<String, Object>> eliminarMedico(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        adminService.eliminarMedico(id);
        return ResponseEntity.ok(Map.of("ok", true, "msg", "Médico eliminado correctamente."));
    }

    // ── ESPECIALIDADES ─────────────────────────────────────────────

    @GetMapping("/listar_especialidades.php")
    public ResponseEntity<Map<String, Object>> listarEspecialidades() {
        List<Especialidad> lista = adminService.listarEspecialidades();
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
    public ResponseEntity<Map<String, Object>> crearEspecialidad(@Valid @RequestBody EspecialidadRequest dto) {
        adminService.crearEspecialidad(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("ok", true, "msg", "Especialidad creada correctamente."));
    }

    @PostMapping("/editar_especialidad.php")
    public ResponseEntity<Map<String, Object>> editarEspecialidad(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        if (id == 0) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "msg", "ID inválido."));
        }
        EspecialidadRequest dto = new EspecialidadRequest();
        dto.setNombre(((String) body.getOrDefault("nombre", "")).trim());
        dto.setDescripcion(((String) body.getOrDefault("descripcion", "")).trim());
        dto.setActiva(body.containsKey("activa") ? (Boolean) body.get("activa") : true);

        adminService.editarEspecialidad(id, dto);
        return ResponseEntity.ok(Map.of("ok", true, "msg", "Especialidad actualizada correctamente."));
    }

    @PostMapping("/eliminar_especialidad.php")
    public ResponseEntity<Map<String, Object>> eliminarEspecialidad(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        adminService.eliminarEspecialidad(id);
        return ResponseEntity.ok(Map.of("ok", true, "msg", "Especialidad eliminada correctamente."));
    }

    // ── HISTORIAL DE CITAS ─────────────────────────────────────────

    @GetMapping("/historial_citas.php")
    public ResponseEntity<Map<String, Object>> historialCitas(
            @RequestParam(required = false, defaultValue = "") String paciente,
            @RequestParam(required = false, defaultValue = "") String medico,
            @RequestParam(required = false, defaultValue = "") String fecha) {

        List<Cita> citas = clinicaService.historialCitas(paciente, medico, fecha);
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<Map<String, Object>> lista = new ArrayList<>();

        for (Cita c : citas) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("medico_nombre", c.getMedicoNombre());
            m.put("especialidad", c.getEspecialidad());
            m.put("fecha_legible", c.getFecha() != null ? c.getFecha().format(fmt) : "");
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