package com.utp.ProyectoMarcos.controller;

import com.utp.ProyectoMarcos.model.Cita;
import com.utp.ProyectoMarcos.model.Medico;
import com.utp.ProyectoMarcos.model.Paciente;
import com.utp.ProyectoMarcos.repository.CitaRepository;
import com.utp.ProyectoMarcos.repository.MedicoRepository;
import com.utp.ProyectoMarcos.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/** CONTROLADOR PRINCIPAL QUE REEMPLAZA TODOS LOS ARCHIVOS PHP DE LA CARPETA API/. */
@RestController
@RequestMapping("/ProyectoModificado/ProyectoMarcos/Clinica/api")
@CrossOrigin(origins = "*")
public class ClinicaController {

    @Autowired
    private PacienteRepository pacienteRepo;

    @Autowired
    private MedicoRepository medicoRepo;

    @Autowired
    private CitaRepository citaRepo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/login.php")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String correo = body.getOrDefault("correo", "").trim();
        String password = body.getOrDefault("password", "");
        String tipo = body.getOrDefault("tipo", "paciente");

        Map<String, Object> resp = new LinkedHashMap<>();

        if (tipo.equals("doctor")) {
            Optional<Medico> opt = medicoRepo.findByCorreo(correo);
            if (opt.isPresent() && encoder.matches(password, opt.get().getPassword())) {
                Medico m = opt.get();
                resp.put("ok", true);
                resp.put("tipo", "doctor");
                resp.put("nombre", m.getNombre());
                resp.put("correo", correo);
            } else {
                resp.put("ok", false);
                resp.put("msg", "Correo o contraseña incorrectos.");
            }
        } else {
            Optional<Paciente> opt = pacienteRepo.findByCorreo(correo);
            if (opt.isPresent() && encoder.matches(password, opt.get().getPassword())) {
                Paciente p = opt.get();
                resp.put("ok", true);
                resp.put("tipo", "paciente");
                resp.put("nombre", p.getNombres());
                resp.put("correo", correo);
            } else {
                resp.put("ok", false);
                resp.put("msg", "Correo o contraseña incorrectos.");
            }
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/register.php")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> body) {
        Map<String, Object> resp = new LinkedHashMap<>();

        String nombres   = body.getOrDefault("nombres", "").trim();
        String apellidos = body.getOrDefault("apellidos", "").trim();
        String dni       = body.getOrDefault("dni", "").trim();
        String telefono  = body.getOrDefault("telefono", "").trim();
        String correo    = body.getOrDefault("correo", "").trim();
        String password  = body.getOrDefault("password", "");

        if (nombres.isEmpty() || apellidos.isEmpty() || dni.isEmpty() ||
            telefono.isEmpty() || correo.isEmpty() || password.isEmpty()) {
            resp.put("ok", false);
            resp.put("msg", "Completa todos los campos.");
            return ResponseEntity.ok(resp);
        }

        if (pacienteRepo.existsByCorreo(correo)) {
            resp.put("ok", false);
            resp.put("msg", "Ya existe una cuenta con ese correo.");
            return ResponseEntity.ok(resp);
        }

        Paciente p = new Paciente();
        p.setNombres(nombres);
        p.setApellidos(apellidos);
        p.setDni(dni);
        p.setTelefono(telefono);
        p.setCorreo(correo);
        p.setPassword(encoder.encode(password));
        pacienteRepo.save(p);

        resp.put("ok", true);
        resp.put("nombres", nombres);
        resp.put("correo", correo);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/verificar_correo.php")
    public ResponseEntity<Map<String, Object>> verificarCorreo(@RequestBody Map<String, String> body) {
        String correo = body.getOrDefault("correo", "").trim();
        boolean existe = pacienteRepo.existsByCorreo(correo);
        return ResponseEntity.ok(Map.of("ok", existe));
    }

    @PostMapping("/cambiar_password.php")
    public ResponseEntity<Map<String, Object>> cambiarPassword(@RequestBody Map<String, String> body) {
        String correo   = body.getOrDefault("correo", "").trim();
        String password = body.getOrDefault("password", "");

        if (correo.isEmpty() || password.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Datos incompletos."));
        }

        Optional<Paciente> opt = pacienteRepo.findByCorreo(correo);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Paciente no encontrado."));
        }

        Paciente p = opt.get();
        p.setPassword(encoder.encode(password));
        pacienteRepo.save(p);

        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/guardar_cita.php")
    public ResponseEntity<Map<String, Object>> guardarCita(@RequestBody Map<String, String> body) {
        String correo       = body.getOrDefault("correo", "").trim();
        String medicoNombre = body.getOrDefault("doctor", "");
        String especialidad = body.getOrDefault("especialidad", "");
        String fechaStr     = body.getOrDefault("fecha", "");
        String horaStr      = body.getOrDefault("hora", "");
        String motivo       = body.getOrDefault("motivo", "");

        // Limpiar emojis del nombre del médico (igual que el PHP original)
        medicoNombre = medicoNombre.replaceAll("[^\\x00-\\x7F]", "").trim();

        Optional<Paciente> opt = pacienteRepo.findByCorreo(correo);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Paciente no encontrado."));
        }

        try {
            Cita cita = new Cita();
            cita.setPaciente(opt.get());
            cita.setMedicoNombre(medicoNombre);
            cita.setEspecialidad(especialidad);
            cita.setFecha(LocalDate.parse(fechaStr));
            cita.setHora(LocalTime.parse(horaStr));
            cita.setMotivo(motivo);
            cita.setEstado("pendiente");
            cita.setComentario("");
            citaRepo.save(cita);
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Error al guardar la cita: " + e.getMessage()));
        }

        return ResponseEntity.ok(Map.of("ok", true, "msg", "Cita guardada correctamente."));
    }

    @GetMapping("/mis_citas.php")
    public ResponseEntity<Map<String, Object>> misCitas(@RequestParam String correo) {
        List<Cita> citas = citaRepo.findByPacienteCorreoOrderByFechaDescHoraDesc(correo.trim());

        DateTimeFormatter fechaFmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<Map<String, Object>> lista = new ArrayList<>();

        for (Cita c : citas) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("medico_nombre", c.getMedicoNombre());
            m.put("especialidad", c.getEspecialidad());
            m.put("fecha_legible", c.getFecha() != null ? c.getFecha().format(fechaFmt) : "");
            m.put("hora", c.getHora() != null ? c.getHora().toString() : "");
            m.put("motivo", c.getMotivo());
            m.put("estado", c.getEstado());
            m.put("comentario", c.getComentario());
            // Datos del paciente
            Paciente p = c.getPaciente();
            m.put("nombres", p.getNombres());
            m.put("apellidos", p.getApellidos());
            m.put("dni", p.getDni());
            m.put("telefono", p.getTelefono());
            lista.add(m);
        }

        return ResponseEntity.ok(Map.of("ok", true, "citas", lista));
    }

    @GetMapping("/citas_doctor.php")
    public ResponseEntity<Map<String, Object>> citasDoctor(@RequestParam String nombre) {
        // Limpiar emojis igual que el PHP original
        String nombreLimpio = nombre.replaceAll("[^\\x00-\\x7F]", "").trim();

        List<Cita> citas = citaRepo.findByMedicoNombreOrderByFechaAscHoraAsc(nombreLimpio);

        DateTimeFormatter fechaFmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<Map<String, Object>> lista = new ArrayList<>();

        for (Cita c : citas) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("especialidad", c.getEspecialidad());
            m.put("estado", c.getEstado());
            m.put("fecha_legible", c.getFecha() != null ? c.getFecha().format(fechaFmt) : "");
            m.put("hora", c.getHora() != null ? c.getHora().toString() : "");
            m.put("motivo", c.getMotivo());
            m.put("comentario", c.getComentario());
            // Datos del paciente
            Paciente p = c.getPaciente();
            m.put("nombres", p.getNombres());
            m.put("apellidos", p.getApellidos());
            m.put("dni", p.getDni());
            m.put("telefono", p.getTelefono());
            m.put("correo", p.getCorreo());
            lista.add(m);
        }

        return ResponseEntity.ok(Map.of("ok", true, "citas", lista));
    }

    @PostMapping("/actualizar_estado.php")
    public ResponseEntity<Map<String, Object>> actualizarEstado(@RequestBody Map<String, Object> body) {
        int id = body.containsKey("id") ? (int) body.get("id") : 0;
        String estado = (String) body.getOrDefault("estado", "");

        List<String> permitidos = List.of("pendiente", "confirmada", "atendida");
        if (id == 0 || !permitidos.contains(estado)) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Datos inválidos."));
        }

        Optional<Cita> opt = citaRepo.findById((long) id);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Cita no encontrada."));
        }

        Cita cita = opt.get();
        cita.setEstado(estado);
        citaRepo.save(cita);

        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/editar_cita.php")
    public ResponseEntity<Map<String, Object>> editarCita(@RequestBody Map<String, Object> body) {
        int id = body.containsKey("id") ? (int) body.get("id") : 0;
        String fechaStr = (String) body.getOrDefault("fecha", "");
        String horaStr  = (String) body.getOrDefault("hora", "");
        String motivo   = (String) body.getOrDefault("motivo", "");

        if (id == 0 || fechaStr.isEmpty() || horaStr.isEmpty() || motivo.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Datos incompletos."));
        }

        Optional<Cita> opt = citaRepo.findById((long) id);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Cita no encontrada."));
        }

        try {
            Cita cita = opt.get();
            cita.setFecha(LocalDate.parse(fechaStr));
            cita.setHora(LocalTime.parse(horaStr));
            cita.setMotivo(motivo);
            citaRepo.save(cita);
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Error al editar: " + e.getMessage()));
        }

        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/eliminar_cita.php")
    public ResponseEntity<Map<String, Object>> eliminarCita(@RequestBody Map<String, Object> body) {
        int id = body.containsKey("id") ? (int) body.get("id") : 0;

        if (id == 0) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "ID inválido."));
        }

        if (!citaRepo.existsById((long) id)) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Cita no encontrada."));
        }

        citaRepo.deleteById((long) id);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/guardar_comentario.php")
    public ResponseEntity<Map<String, Object>> guardarComentario(@RequestBody Map<String, Object> body) {
        int id = body.containsKey("id") ? (int) body.get("id") : 0;
        String comentario = body.containsKey("comentario") ? ((String) body.get("comentario")).trim() : "";

        if (id == 0) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "ID inválido."));
        }

        Optional<Cita> opt = citaRepo.findById((long) id);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "Cita no encontrada."));
        }

        Cita cita = opt.get();
        cita.setComentario(comentario);
        citaRepo.save(cita);

        return ResponseEntity.ok(Map.of("ok", true));
    }



    @GetMapping("/perfil.php")
    public ResponseEntity<Map<String, Object>> getPerfil(@RequestParam String correo) {
    Optional<Paciente> opt = pacienteRepo.findByCorreo(correo.trim());
    if (opt.isEmpty()) {
        return ResponseEntity.ok(Map.of("ok", false, "msg", "Paciente no encontrado."));
    }
    Paciente p = opt.get();
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
    String correoActual = body.getOrDefault("correo_actual", "").trim();
    String nombres      = body.getOrDefault("nombres", "").trim();
    String apellidos    = body.getOrDefault("apellidos", "").trim();
    String dni          = body.getOrDefault("dni", "").trim();
    String telefono     = body.getOrDefault("telefono", "").trim();
    String correoNuevo  = body.getOrDefault("correo_nuevo", "").trim();
    String passwordNueva = body.getOrDefault("password_nueva", "");

    if (correoActual.isEmpty() || nombres.isEmpty() || apellidos.isEmpty()
            || dni.isEmpty() || telefono.isEmpty() || correoNuevo.isEmpty()) {
        return ResponseEntity.ok(Map.of("ok", false, "msg", "Completa todos los campos obligatorios."));
    }

    Optional<Paciente> opt = pacienteRepo.findByCorreo(correoActual);
    if (opt.isEmpty()) {
        return ResponseEntity.ok(Map.of("ok", false, "msg", "Paciente no encontrado."));
    }

    // Si cambió el correo, verificar que el nuevo no esté en uso
    if (!correoNuevo.equals(correoActual) && pacienteRepo.existsByCorreo(correoNuevo)) {
        return ResponseEntity.ok(Map.of("ok", false, "msg", "Ese correo ya está registrado por otro usuario."));
    }

    Paciente p = opt.get();
    p.setNombres(nombres);
    p.setApellidos(apellidos);
    p.setDni(dni);
    p.setTelefono(telefono);
    p.setCorreo(correoNuevo);

    if (!passwordNueva.isEmpty()) {
        if (passwordNueva.length() < 6) {
            return ResponseEntity.ok(Map.of("ok", false, "msg", "La contraseña nueva debe tener al menos 6 caracteres."));
        }
        p.setPassword(encoder.encode(passwordNueva));
    }

    pacienteRepo.save(p);

    Map<String, Object> resp = new LinkedHashMap<>();
    resp.put("ok", true);
    resp.put("nombres", p.getNombres());
    resp.put("correo", p.getCorreo());
    return ResponseEntity.ok(resp);
    }


    
    @GetMapping("/generar-hash")
    public ResponseEntity<String> generarHash() {
    String hash = encoder.encode("doctor123");
    return ResponseEntity.ok(hash);
    }



}

