window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    const nombre = localStorage.getItem("usuarioNombre");

    // Si estamos en login.html y hay sesión, redirigir
    if (document.getElementById("panel-paciente")) {
        if (sesion === "true") {
            if (tipo === "doctor") window.location.href = "/Clinica/pages/doctor.html";
            else window.location.href = "/Clinica/pages/inicio.html";
        }
        return;
    }

    // Lógica para inicio.html y otras páginas
    const btnLogin   = document.getElementById("btn-login");
    const btnCerrar  = document.getElementById("btn-cerrar-sesion");
    const btnMisCitas = document.getElementById("btn-mis-citas");
    const saludo     = document.getElementById("saludo-usuario");

    if (sesion === "true" && tipo !== "doctor") {
        if (btnLogin)    btnLogin.classList.add("d-none");
        if (saludo)      { saludo.classList.remove("d-none"); saludo.textContent = "👋 Hola, " + nombre; }
        if (btnCerrar)   btnCerrar.classList.remove("d-none");
        if (btnMisCitas) btnMisCitas.classList.remove("d-none");
    } else {
        if (btnLogin)    btnLogin.classList.remove("d-none");
        if (saludo)      saludo.classList.add("d-none");
        if (btnCerrar)   btnCerrar.classList.add("d-none");
        if (btnMisCitas) btnMisCitas.classList.add("d-none");
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

    try {
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
            window.location.href = "/Clinica/pages/inicio.html";
        } else {
            mostrarError();
        }
    } catch (err) {
        mostrarError();
    }
}

async function loginDoctor() {
    const correo   = document.getElementById("correo-doctor").value.trim();
    const password = document.getElementById("password-doctor").value;

    try {
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
            window.location.href = "/Clinica/pages/doctor.html";
        } else {
            mostrarError();
        }
    } catch (err) {
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