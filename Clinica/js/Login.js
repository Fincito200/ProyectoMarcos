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