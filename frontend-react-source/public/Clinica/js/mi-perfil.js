function togglePass(id, btn) {
    const input = document.getElementById(id);
    if (input.type === "password") { input.type = "text"; btn.textContent = "🙈"; }
    else { input.type = "password"; btn.textContent = "👁️"; }
}

async function cargarPerfil() {
    const correo = localStorage.getItem("usuarioCorreo") || "";
    try {
        const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/perfil.php?correo=" + encodeURIComponent(correo));
        const data = await res.json();
        if (data.ok) {
            document.getElementById("p-nombres").value   = data.nombres;
            document.getElementById("p-apellidos").value = data.apellidos;
            document.getElementById("p-dni").value       = data.dni;
            document.getElementById("p-telefono").value  = data.telefono;
            document.getElementById("p-correo").value    = data.correo;
        }
    } catch (e) {}
}

async function guardarPerfil() {
    const correoActual  = localStorage.getItem("usuarioCorreo") || "";
    const nombres       = document.getElementById("p-nombres").value.trim();
    const apellidos     = document.getElementById("p-apellidos").value.trim();
    const dni           = document.getElementById("p-dni").value.trim();
    const telefono      = document.getElementById("p-telefono").value.trim();
    const correoNuevo   = document.getElementById("p-correo").value.trim();
    const passNueva     = document.getElementById("p-pass-nueva").value;
    const passConfirmar = document.getElementById("p-pass-confirmar").value;
    const errEl         = document.getElementById("alerta-error");
    const okEl          = document.getElementById("alerta-exito");

    errEl.classList.add("d-none");
    okEl.classList.add("d-none");

    if (!nombres || !apellidos || !dni || !telefono || !correoNuevo) {
        errEl.textContent = "❌ Completa todos los campos.";
        errEl.classList.remove("d-none");
        return;
    }
    if (passNueva && passNueva !== passConfirmar) {
        errEl.textContent = "❌ Las contraseñas no coinciden.";
        errEl.classList.remove("d-none");
        return;
    }

    try {
        const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/actualizar_perfil.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo_actual: correoActual, nombres, apellidos, dni, telefono,
                                    correo_nuevo: correoNuevo, password_nueva: passNueva })
        });
        const data = await res.json();

        if (!data.ok) {
            errEl.textContent = "❌ " + data.msg;
            errEl.classList.remove("d-none");
            return;
        }

        // Actualizar localStorage con nuevos datos
        localStorage.setItem("usuarioCorreo", data.correo);
        localStorage.setItem("usuarioNombre", data.nombres);

        okEl.textContent = "✅ ¡Perfil actualizado correctamente!";
        okEl.classList.remove("d-none");

        document.getElementById("p-pass-nueva").value = "";
        document.getElementById("p-pass-confirmar").value = "";

    } catch (e) {
        errEl.textContent = "❌ No se pudo conectar con el servidor.";
        errEl.classList.remove("d-none");
    }
}

window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    const nombre = localStorage.getItem("usuarioNombre");

    if (sesion !== "true" || tipo === "doctor") {
        window.location.href = "/Clinica/pages/login.html";
        return;
    }

    const saludo = document.getElementById("saludo-usuario");
    if (saludo) { saludo.classList.remove("d-none"); saludo.textContent = "👋 Hola, " + nombre; }

    const btnCerrar = document.getElementById("btn-cerrar-sesion");
    if (btnCerrar) btnCerrar.classList.remove("d-none");

    cargarPerfil();
});