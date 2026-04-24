function togglePass(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
    } else {
        input.type = "password";
        btn.textContent = "👁️";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const passInput = document.getElementById("reg-password");
    if (!passInput) return;

    passInput.addEventListener("input", function () {
        const val   = passInput.value;
        const fill  = document.getElementById("strength-fill");
        const label = document.getElementById("strength-label");
        let score   = 0;

        if (val.length >= 6)           score++;
        if (val.length >= 10)          score++;
        if (/[A-Z]/.test(val))         score++;
        if (/[0-9]/.test(val))         score++;
        if (/[^A-Za-z0-9]/.test(val))  score++;

        const niveles = [
            { pct: "0%",   color: "#dee2e6", texto: "" },
            { pct: "25%",  color: "#dc3545", texto: "Muy débil" },
            { pct: "50%",  color: "#fd7e14", texto: "Débil" },
            { pct: "75%",  color: "#ffc107", texto: "Aceptable" },
            { pct: "90%",  color: "#20c997", texto: "Fuerte" },
            { pct: "100%", color: "#198754", texto: "Muy fuerte" },
        ];

        const n = niveles[score] || niveles[0];
        fill.style.width      = n.pct;
        fill.style.background = n.color;
        label.textContent     = n.texto;
        label.style.color     = n.color;
    });
});

function mostrarError(msg) {
    const el = document.getElementById("alerta-error");
    el.textContent = "❌ " + msg;
    el.classList.remove("d-none");
    document.getElementById("alerta-exito").classList.add("d-none");
    setTimeout(() => el.classList.add("d-none"), 5000);
}

function mostrarExito(msg) {
    const el = document.getElementById("alerta-exito");
    el.textContent = "✅ " + msg;
    el.classList.remove("d-none");
    document.getElementById("alerta-error").classList.add("d-none");
}

async function registrar() {
    const nombres   = document.getElementById("reg-nombres").value.trim();
    const apellidos = document.getElementById("reg-apellidos").value.trim();
    const dni       = document.getElementById("reg-dni").value.trim();
    const telefono  = document.getElementById("reg-telefono").value.trim();
    const correo    = document.getElementById("reg-correo").value.trim();
    const password  = document.getElementById("reg-password").value;
    const password2 = document.getElementById("reg-password2").value;

    if (!nombres || !apellidos || !dni || !telefono || !correo || !password || !password2) {
        mostrarError("Completa todos los campos.");
        return;
    }

    if (!/^\d{8}$/.test(dni)) {
        mostrarError("El DNI debe tener exactamente 8 dígitos.");
        return;
    }

    if (!/^\d{7,9}$/.test(telefono)) {
        mostrarError("El teléfono debe tener entre 7 y 9 dígitos.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarError("Ingresa un correo electrónico válido.");
        return;
    }

    if (password.length < 6) {
        mostrarError("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    if (password !== password2) {
        mostrarError("Las contraseñas no coinciden.");
        return;
    }

    try {
        const res = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombres, apellidos, dni, telefono, correo, password })
        });

        const data = await res.json();

        if (data.ok) {
            localStorage.setItem("sesionActiva",  "true");
            localStorage.setItem("usuarioNombre", data.nombres);
            localStorage.setItem("tipoUsuario",   "paciente");
            localStorage.setItem("usuarioCorreo", data.correo);
            mostrarExito("¡Cuenta creada! Redirigiendo...");
            setTimeout(() => { window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/inicio.html"; }, 1500);
        } else {
            mostrarError(data.msg);
        }

    } catch (err) {
        mostrarError("No se pudo conectar con el servidor.");
    }
}

window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    if (sesion === "true") {
        if (tipo === "doctor") window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/doctor.html";
        else window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/inicio.html";
    }
});