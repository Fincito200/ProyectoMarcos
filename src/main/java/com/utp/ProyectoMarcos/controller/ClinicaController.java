package com.utp.ProyectoMarcos.controller;

import com.utp.ProyectoMarcos.dto.CitaRequest;
import com.utp.ProyectoMarcos.dto.PacienteRequest;
import com.utp.ProyectoMarcos.model.Cita;
import com.utp.ProyectoMarcos.model.Medico;
import com.utp.ProyectoMarcos.model.Paciente;
import com.utp.ProyectoMarcos.repository.MedicoRepository;
import com.utp.ProyectoMarcos.service.ClinicaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/ProyectoModificado/ProyectoMarcos/Clinica/api")
@CrossOrigin(origins = "*")
public class ClinicaController {

    private final ClinicaService clinicaService;
    private final MedicoRepository medicoRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public ClinicaController(ClinicaService clinicaService, MedicoRepository medicoRepo) {
        this.clinicaService = clinicaService;
        this.medicoRepo = medicoRepo;
    }

    // ── AUTH ───────────────────────────────────────────────────────

    @PostMapping("/login.php")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String correo   = body.getOrDefault("correo", "").trim();
        String password = body.getOrDefault("password", "");
        String tipo     = body.getOrDefault("tipo", "paciente");

        Map<String, Object> resp = new LinkedHashMap<>();

        if (tipo.equals("doctor")) {
            Optional<Medico> opt = medicoRepo.findByCorreo(correo);
            if (opt.isPresent() && encoder.matches(password, opt.get().getPassword())) {
                resp.put("ok", true);
                resp.put("tipo", "doctor");
                resp.put("nombre", opt.get().getNombre());
                resp.put("correo", correo);
            } else {
                resp.put("ok", false);
                resp.put("msg", "Correo o contraseña incorrectos.");
            }
            return ResponseEntity.ok(resp);
        }

        try {
            Paciente p = clinicaService.loginPaciente(correo, password);
            resp.put("ok", true);
            resp.put("tipo", "paciente");
            resp.put("nombre", p.getNombres());
            resp.put("correo", correo);
        } catch (RuntimeException e) {
            resp.put("ok", false);
            resp.put("msg", e.getMessage());
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/register.php")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody PacienteRequest dto) {
        Paciente p = clinicaService.registrar(dto);
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("ok", true);
        resp.put("nombres", p.getNombres());
        resp.put("correo", p.getCorreo());
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PostMapping("/verificar_correo.php")
    public ResponseEntity<Map<String, Object>> verificarCorreo(@RequestBody Map<String, String> body) {
        String correo = body.getOrDefault("correo", "").trim();
        boolean existe = clinicaService.existeCorreo(correo);
        return ResponseEntity.ok(Map.of("ok", existe));
    }

    @PostMapping("/cambiar_password.php")
    public ResponseEntity<Map<String, Object>> cambiarPassword(@RequestBody Map<String, String> body) {
        String correo   = body.getOrDefault("correo", "").trim();
        String password = body.getOrDefault("password", "");
        if (correo.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "msg", "Datos incompletos."));
        }
        clinicaService.cambiarPassword(correo, password);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    // ── PERFIL ─────────────────────────────────────────────────────

    @GetMapping("/perfil.php")
    public ResponseEntity<Map<String, Object>> getPerfil(@RequestParam String correo) {
        Paciente p = clinicaService.getPerfil(correo.trim());
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("ok", true);
        resp.put("nombres", p.getNombres());
        resp.put("apellidos", p.getApellidos());
        resp.put("dni", p.getDni());
        resp.put("telefono", p.getTelefono());
        resp.put("correo", p.getCorreo());
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/actualizar_perfil.php")
    public ResponseEntity<Map<String, Object>> actualizarPerfil(@RequestBody Map<String, String> body) {
        String correoActual  = body.getOrDefault("correo_actual", "").trim();
        String nombres       = body.getOrDefault("nombres", "").trim();
        String apellidos     = body.getOrDefault("apellidos", "").trim();
        String dni           = body.getOrDefault("dni", "").trim();
        String telefono      = body.getOrDefault("telefono", "").trim();
        String correoNuevo   = body.getOrDefault("correo_nuevo", "").trim();
        String passwordNueva = body.getOrDefault("password_nueva", "");

        if (correoActual.isEmpty() || nombres.isEmpty() || apellidos.isEmpty()
                || dni.isEmpty() || telefono.isEmpty() || correoNuevo.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("ok", false, "msg", "Completa todos los campos obligatorios."));
        }

        Paciente p = clinicaService.actualizarPerfil(
                correoActual, nombres, apellidos, dni, telefono, correoNuevo, passwordNueva);
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("ok", true);
        resp.put("nombres", p.getNombres());
        resp.put("correo", p.getCorreo());
        return ResponseEntity.ok(resp);
    }

    // CITAS

    @PostMapping("/guardar_cita.php")
    public ResponseEntity<Map<String, Object>> guardarCita(@Valid @RequestBody CitaRequest dto) {
        clinicaService.guardarCita(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("ok", true, "msg", "Cita guardada correctamente."));
    }

    @GetMapping("/mis_citas.php")
    public ResponseEntity<Map<String, Object>> misCitas(@RequestParam String correo) {
        List<Cita> citas = clinicaService.misCitas(correo);
        return ResponseEntity.ok(Map.of("ok", true, "citas", mapearCitasPaciente(citas)));
    }

    @GetMapping("/citas_doctor.php")
    public ResponseEntity<Map<String, Object>> citasDoctor(@RequestParam String nombre) {
        List<Cita> citas = clinicaService.citasDoctor(nombre);
        return ResponseEntity.ok(Map.of("ok", true, "citas", mapearCitasDoctor(citas)));
    }

    @PostMapping("/actualizar_estado.php")
    public ResponseEntity<Map<String, Object>> actualizarEstado(@RequestBody Map<String, Object> body) {
        Long id     = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        String estado = (String) body.getOrDefault("estado", "");
        clinicaService.actualizarEstadoCita(id, estado);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/editar_cita.php")
    public ResponseEntity<Map<String, Object>> editarCita(@RequestBody Map<String, Object> body) {
        Long id       = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        String fecha  = (String) body.getOrDefault("fecha", "");
        String hora   = (String) body.getOrDefault("hora", "");
        String motivo = (String) body.getOrDefault("motivo", "");

        if (id == 0 || fecha.isEmpty() || hora.isEmpty() || motivo.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "msg", "Datos incompletos."));
        }
        clinicaService.editarCita(id, fecha, hora, motivo);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/eliminar_cita.php")
    public ResponseEntity<Map<String, Object>> eliminarCita(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        if (id == 0) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "msg", "ID inválido."));
        }
        clinicaService.eliminarCita(id);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/guardar_comentario.php")
    public ResponseEntity<Map<String, Object>> guardarComentario(@RequestBody Map<String, Object> body) {
        Long id = body.containsKey("id") ? Long.valueOf(body.get("id").toString()) : 0L;
        String comentario = body.containsKey("comentario") ? ((String) body.get("comentario")).trim() : "";
        if (id == 0) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "msg", "ID inválido."));
        }
        clinicaService.guardarComentario(id, comentario);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    // UTILIDADES

    @GetMapping("/generar-hash")
    public ResponseEntity<String> generarHash() {
        return ResponseEntity.ok(encoder.encode("doctor123"));
    }

    // HELPERS DE MAPEO

    private List<Map<String, Object>> mapearCitasPaciente(List<Cita> citas) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<Map<String, Object>> lista = new ArrayList<>();
        for (Cita c : citas) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("medico_nombre", c.getMedicoNombre());
            m.put("especialidad", c.getEspecialidad());
            m.put("fecha_legible", c.getFecha() != null ? c.getFecha().format(fmt) : "");
            m.put("hora", c.getHora() != null ? c.getHora().toString() : "");
            m.put("motivo", c.getMotivo());
            m.put("estado", c.getEstado());
            m.put("comentario", c.getComentario());
            Paciente p = c.getPaciente();
            m.put("nombres", p.getNombres());
            m.put("apellidos", p.getApellidos());
            m.put("dni", p.getDni());
            m.put("telefono", p.getTelefono());
            lista.add(m);
        }
        return lista;
    }

    private List<Map<String, Object>> mapearCitasDoctor(List<Cita> citas) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<Map<String, Object>> lista = new ArrayList<>();
        for (Cita c : citas) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("especialidad", c.getEspecialidad());
            m.put("estado", c.getEstado());
            m.put("fecha_legible", c.getFecha() != null ? c.getFecha().format(fmt) : "");
            m.put("hora", c.getHora() != null ? c.getHora().toString() : "");
            m.put("motivo", c.getMotivo());
            m.put("comentario", c.getComentario());
            Paciente p = c.getPaciente();
            m.put("nombres", p.getNombres());
            m.put("apellidos", p.getApellidos());
            m.put("dni", p.getDni());
            m.put("telefono", p.getTelefono());
            m.put("correo", p.getCorreo());
            lista.add(m);
        }
        return lista;
    }
}