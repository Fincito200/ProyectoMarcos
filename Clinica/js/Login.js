// ══════════════════════════════════════════════
//  USUARIOS (prueba fija + registrados dinámicos)
// ══════════════════════════════════════════════
const usuarioPrueba = { correo: "juan@gmail.com", password: "1234", nombre: "Juan" };

const doctoresPrueba = [
    { correo: "joseph@clinica.com",  password: "doctor123", nombre: "👨‍⚕️Méd. Joseph"  },
    { correo: "eduardo@clinica.com", password: "doctor123", nombre: "👨‍⚕️ Méd. Eduardo" },
    { correo: "ney@clinica.com",     password: "doctor123", nombre: "👨‍⚕️ Méd. Ney"     },
    { correo: "enrique@clinica.com", password: "doctor123", nombre: "👨‍⚕️ Méd. Enrique" },
    { correo: "aaron@clinica.com",   password: "doctor123", nombre: "👨‍⚕️ Méd. Aaron"   }
];

// Busca paciente: primero en registrados, luego en el usuario de prueba
function buscarPaciente(correo, password) {
    const registrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    const encontrado  = registrados.find(u => u.correo === correo && u.password === password);
    if (encontrado) return { correo: encontrado.correo, nombre: encontrado.nombres };
    if (correo === usuarioPrueba.correo && password === usuarioPrueba.password) return usuarioPrueba;
    return null;
}

// ══════════════════════════════════════════════
//  AL CARGAR LA PÁGINA
// ══════════════════════════════════════════════
window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    const nombre = localStorage.getItem("usuarioNombre");

    // ── Si estamos en login.html y ya hay sesión, redirigir ──
    if (document.getElementById("panel-paciente")) {
        if (sesion === "true") {
            if (tipo === "doctor") window.location.href = "/Clinica/pages/doctor.html";
            else window.location.href = "/Clinica/pages/inicio.html";
        }
        return;
    }

    // ── Lógica del navbar (inicio.html, nosotros.html, etc.) ──
    if (sesion === "true" && tipo !== "doctor") {
        const btnLogin = document.getElementById("btn-login");
        if (btnLogin) btnLogin.classList.add("d-none");

        const saludo = document.getElementById("saludo-usuario");
        if (saludo) { saludo.classList.remove("d-none"); saludo.textContent = "👋 Hola, " + nombre; }

        const btnCerrar = document.getElementById("btn-cerrar-sesion");
        if (btnCerrar) btnCerrar.classList.remove("d-none");

        const citas = JSON.parse(localStorage.getItem("misCitas") || "[]");
        if (citas.length > 0) {
            const btnMisCitas = document.getElementById("btn-mis-citas");
            if (btnMisCitas) btnMisCitas.classList.remove("d-none");
        }
    } else if (sesion !== "true") {
        const btnLogin = document.getElementById("btn-login");
        if (btnLogin) btnLogin.classList.remove("d-none");
    }
});

// ══════════════════════════════════════════════
//  TABS (paciente / doctor)
// ══════════════════════════════════════════════
function switchTab(tab) {
    document.getElementById("alerta-error").classList.add("d-none");
    document.querySelectorAll(".login-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel-form").forEach(p => p.classList.remove("active"));
    document.getElementById("tab-" + tab).classList.add("active");
    document.getElementById("panel-" + tab).classList.add("active");
}

// ══════════════════════════════════════════════
//  MOSTRAR ERROR
// ══════════════════════════════════════════════
function mostrarError() {
    const alerta = document.getElementById("alerta-error");
    alerta.classList.remove("d-none");
    setTimeout(() => alerta.classList.add("d-none"), 4000);
}

// ══════════════════════════════════════════════
//  LOGIN PACIENTE
// ══════════════════════════════════════════════
function loginPaciente() {
    const correo   = document.getElementById("correo-paciente").value.trim();
    const password = document.getElementById("password-paciente").value;
    const paciente = buscarPaciente(correo, password);

    if (paciente) {
        localStorage.setItem("sesionActiva",  "true");
        localStorage.setItem("usuarioNombre", paciente.nombre);
        localStorage.setItem("tipoUsuario",   "paciente");
        window.location.href = "/Clinica/pages/inicio.html";
    } else {
        mostrarError();
    }
}

// ══════════════════════════════════════════════
//  LOGIN DOCTOR
// ══════════════════════════════════════════════
function loginDoctor() {
    const correo   = document.getElementById("correo-doctor").value.trim();
    const password = document.getElementById("password-doctor").value;
    const doctor   = doctoresPrueba.find(d => d.correo === correo && d.password === password);

    if (doctor) {
        localStorage.setItem("sesionActiva",  "true");
        localStorage.setItem("usuarioNombre", doctor.nombre);
        localStorage.setItem("tipoUsuario",   "doctor");
        localStorage.setItem("doctorNombre",  doctor.nombre);
        window.location.href = "/Clinica/pages/doctor.html";
    } else {
        mostrarError();
    }
}

// ══════════════════════════════════════════════
//  CERRAR SESIÓN PACIENTE
//  ⚠️ NO borra misCitas — las citas persisten
// ══════════════════════════════════════════════
function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("doctorNombre");
    window.location.href = "/Clinica/pages/inicio.html";
}

// ══════════════════════════════════════════════
//  CERRAR SESIÓN DOCTOR
//  ⚠️ NO borra misCitas ni estadosCitas
// ══════════════════════════════════════════════
function cerrarSesionDoctor() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("doctorNombre");
    window.location.href = "/Clinica/pages/login.html";
}

// ══════════════════════════════════════════════
//  VERIFICAR SESIÓN PARA ABRIR MODAL CITA
// ══════════════════════════════════════════════
function verificarSesionParaCita() {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");

    if (sesion === "true" && tipo !== "doctor") {
        new bootstrap.Modal(document.getElementById("modalCita")).show();
    } else if (sesion === "true" && tipo === "doctor") {
        alert("Los médicos no pueden generar citas desde el portal de pacientes.");
    } else {
        new bootstrap.Modal(document.getElementById("modalSinSesion")).show();
    }
}