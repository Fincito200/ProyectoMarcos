const usuarioPrueba = { correo: "juan@gmail.com", password: "1234", nombre: "Juan" };

window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    const nombre = localStorage.getItem("usuarioNombre");

    if (document.getElementById("panel-paciente")) {
        if (sesion === "true") {
            if (tipo === "doctor") window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/doctor.html";
            else window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/inicio.html";
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

    const tabBtn = document.getElementById("tab-" + tab);
    if (tabBtn) tabBtn.classList.add("active");
    document.getElementById("panel-" + tab).classList.add("active");

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

async function loginPaciente() {
    const correo   = document.getElementById("correo-paciente").value.trim();
    const password = document.getElementById("password-paciente").value;

    const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password, tipo: "paciente" })
    });
    const data = await res.json();

    if (data.ok) {
        localStorage.setItem("sesionActiva",  "true");
        localStorage.setItem("usuarioNombre", data.nombre);
        localStorage.setItem("tipoUsuario",   "paciente");
        localStorage.setItem("usuarioCorreo", data.correo);
        window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/inicio.html";
    } else {
        mostrarError();
    }
}

async function loginDoctor() {
    const correo   = document.getElementById("correo-doctor").value.trim();
    const password = document.getElementById("password-doctor").value;

    const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password, tipo: "doctor" })
    });
    const data = await res.json();

    if (data.ok) {
        localStorage.setItem("sesionActiva",  "true");
        localStorage.setItem("usuarioNombre", data.nombre);
        localStorage.setItem("tipoUsuario",   "doctor");
        localStorage.setItem("doctorNombre",  data.nombre);
        localStorage.setItem("usuarioCorreo", data.correo);
        window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/doctor.html";
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
    window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/inicio.html";
}

function cerrarSesionDoctor() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("doctorNombre");
    localStorage.removeItem("usuarioCorreo");
    window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/login.html";
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

async function verificarCorreoRecuperar() {
    const correo = document.getElementById("recuperar-correo").value.trim().toLowerCase();
    const errEl  = document.getElementById("recuperar-error");

    if (!correo) {
        errEl.textContent = "❌ Ingresa tu correo.";
        errEl.classList.remove("d-none");
        return;
    }

    try {
        const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/verificar_correo.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo })
        });
        const data = await res.json();

        if (!data.ok) {
            errEl.textContent = "❌ No encontramos una cuenta con ese correo.";
            errEl.classList.remove("d-none");
            return;
        }

        sessionStorage.setItem("recuperar-correo-temp", correo);
        errEl.classList.add("d-none");
        document.getElementById("recuperar-paso1").classList.add("d-none");
        document.getElementById("recuperar-paso2").classList.remove("d-none");

    } catch (err) {
        errEl.textContent = "❌ No se pudo conectar con el servidor.";
        errEl.classList.remove("d-none");
    }
}

async function guardarNuevaPassword() {
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

    try {
        await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/cambiar_password.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, password: nueva })
        });
    } catch (err) {
        errEl.textContent = "❌ No se pudo conectar con el servidor.";
        errEl.classList.remove("d-none");
        return;
    }

    sessionStorage.removeItem("recuperar-correo-temp");
    errEl.classList.add("d-none");
    exitoEl.textContent = "✅ ¡Contraseña actualizada! Redirigiendo...";
    exitoEl.classList.remove("d-none");

    setTimeout(() => switchTab("paciente"), 2000);
}

window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    if (sesion === "true") {
        if (tipo === "doctor") window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/doctor.html";
        else window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/inicio.html";
    }
});