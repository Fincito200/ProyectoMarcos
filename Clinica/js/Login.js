const usuarioPrueba = { correo: "juan@gmail.com", password: "1234", nombre: "Juan" };

const doctoresPrueba = [
    { correo: "joseph@clinica.com",  password: "doctor123", nombre: "👨‍⚕️Méd. Joseph"  },
    { correo: "eduardo@clinica.com", password: "doctor123", nombre: "👨‍⚕️ Méd. Eduardo" },
    { correo: "ney@clinica.com",     password: "doctor123", nombre: "👨‍⚕️ Méd. Ney"     },
    { correo: "enrique@clinica.com", password: "doctor123", nombre: "👨‍⚕️ Méd. Enrique" },
    { correo: "aaron@clinica.com",   password: "doctor123", nombre: "👨‍⚕️ Méd. Aaron"   }
];

function buscarPaciente(correo, password) {
    const registrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    const encontrado  = registrados.find(u => u.correo === correo && u.password === password);
    if (encontrado) return { correo: encontrado.correo, nombre: encontrado.nombres };
    if (correo === usuarioPrueba.correo && password === usuarioPrueba.password) return usuarioPrueba;
    return null;
}

window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    const nombre = localStorage.getItem("usuarioNombre");

    if (document.getElementById("panel-paciente")) {
        if (sesion === "true") {
            if (tipo === "doctor") window.location.href = "/Clinica/pages/doctor.html";
            else window.location.href = "/Clinica/pages/inicio.html";
        }
        return;
    }

    if (sesion === "true" && tipo !== "doctor") {
        const btnLogin = document.getElementById("btn-login");
        if (btnLogin) btnLogin.classList.add("d-none");

        const saludo = document.getElementById("saludo-usuario");
        if (saludo) { saludo.classList.remove("d-none"); saludo.textContent = "👋 Hola, " + nombre; }

        const btnCerrar = document.getElementById("btn-cerrar-sesion");
        if (btnCerrar) btnCerrar.classList.remove("d-none");

        const correoActivo = localStorage.getItem("usuarioCorreo") || "guest";
        const citas = JSON.parse(localStorage.getItem("misCitas_" + correoActivo) || "[]");
        if (citas.length > 0) {
            const btnMisCitas = document.getElementById("btn-mis-citas");
            if (btnMisCitas) btnMisCitas.classList.remove("d-none");
        }
    } else if (sesion !== "true") {
        const btnLogin = document.getElementById("btn-login");
        if (btnLogin) btnLogin.classList.remove("d-none");
    }
});

function switchTab(tab) {
    document.getElementById("alerta-error").classList.add("d-none");
    document.querySelectorAll(".login-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel-form").forEach(p => p.classList.remove("active"));

    // Las tabs de recuperar no tienen botón, solo activamos el panel
    const tabBtn = document.getElementById("tab-" + tab);
    if (tabBtn) tabBtn.classList.add("active");
    document.getElementById("panel-" + tab).classList.add("active");

    // Limpiar estado del flujo de recuperación al abrirlo
    if (tab === "recuperar") {
        document.getElementById("recuperar-correo").value = "";
        document.getElementById("recuperar-nueva").value  = "";
        document.getElementById("recuperar-confirmar").value = "";
        document.getElementById("recuperar-paso1").classList.remove("d-none");
        document.getElementById("recuperar-paso2").classList.add("d-none");
        document.getElementById("recuperar-error").classList.add("d-none");
        document.getElementById("recuperar-error2").classList.add("d-none");
        document.getElementById("recuperar-exito").classList.add("d-none");
    }
}

function mostrarError() {
    const alerta = document.getElementById("alerta-error");
    alerta.classList.remove("d-none");
    setTimeout(() => alerta.classList.add("d-none"), 4000);
}

function loginPaciente() {
    const correo   = document.getElementById("correo-paciente").value.trim();
    const password = document.getElementById("password-paciente").value;
    const paciente = buscarPaciente(correo, password);

    if (paciente) {
        localStorage.setItem("sesionActiva",  "true");
        localStorage.setItem("usuarioNombre", paciente.nombre);
        localStorage.setItem("tipoUsuario",   "paciente");
        localStorage.setItem("usuarioCorreo", paciente.correo);
        window.location.href = "/Clinica/pages/inicio.html";
    } else {
        mostrarError();
    }
}

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

function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("doctorNombre");
    localStorage.removeItem("usuarioCorreo");
    window.location.href = "/Clinica/pages/inicio.html";
}

function cerrarSesionDoctor() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("doctorNombre");
    localStorage.removeItem("usuarioCorreo");
    window.location.href = "/Clinica/pages/login.html";
}

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

// ══════════════════════════════════════════════
//  RECUPERAR CONTRASEÑA
// ══════════════════════════════════════════════

function verificarCorreoRecuperar() {
    const correo = document.getElementById("recuperar-correo").value.trim().toLowerCase();
    const errEl  = document.getElementById("recuperar-error");

    if (!correo) {
        errEl.textContent = "❌ Ingresa tu correo.";
        errEl.classList.remove("d-none");
        return;
    }

    // Buscar en usuarios registrados dinámicamente
    const registrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    const existe = registrados.find(u => u.correo.toLowerCase() === correo) ||
                   correo === usuarioPrueba.correo;

    if (!existe) {
        errEl.textContent = "❌ No encontramos una cuenta con ese correo.";
        errEl.classList.remove("d-none");
        return;
    }

    // Guardar temporalmente el correo para el paso 2
    sessionStorage.setItem("recuperar-correo-temp", correo);

    errEl.classList.add("d-none");
    document.getElementById("recuperar-paso1").classList.add("d-none");
    document.getElementById("recuperar-paso2").classList.remove("d-none");
}

function guardarNuevaPassword() {
    const nueva     = document.getElementById("recuperar-nueva").value;
    const confirmar = document.getElementById("recuperar-confirmar").value;
    const errEl     = document.getElementById("recuperar-error2");
    const exitoEl   = document.getElementById("recuperar-exito");
    const correo    = sessionStorage.getItem("recuperar-correo-temp");

    if (!nueva || !confirmar) {
        errEl.textContent = "❌ Completa ambos campos.";
        errEl.classList.remove("d-none");
        return;
    }

    if (nueva.length < 6) {
        errEl.textContent = "❌ La contraseña debe tener al menos 6 caracteres.";
        errEl.classList.remove("d-none");
        return;
    }

    if (nueva !== confirmar) {
        errEl.textContent = "❌ Las contraseñas no coinciden.";
        errEl.classList.remove("d-none");
        return;
    }

    // Actualizar en usuariosRegistrados
    const registrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    const idx = registrados.findIndex(u => u.correo.toLowerCase() === correo);
    if (idx !== -1) {
        registrados[idx].password = nueva;
        localStorage.setItem("usuariosRegistrados", JSON.stringify(registrados));
    }
    // Nota: el usuario de prueba juan@gmail.com es fijo en código, no se puede cambiar desde aquí

    sessionStorage.removeItem("recuperar-correo-temp");
    errEl.classList.add("d-none");
    exitoEl.textContent = "✅ ¡Contraseña actualizada! Redirigiendo...";
    exitoEl.classList.remove("d-none");

    setTimeout(() => switchTab("paciente"), 2000);
}