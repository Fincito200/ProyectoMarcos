window.addEventListener("load", function() {
    const sesion = localStorage.getItem("sesionActiva");
    const nombre = localStorage.getItem("usuarioNombre");

    if (sesion === "true") {
        document.getElementById("btn-login").classList.add("d-none");
        document.getElementById("saludo-usuario").classList.remove("d-none");
        document.getElementById("saludo-usuario").textContent = "👋 Hola, " + nombre;
        document.getElementById("btn-cerrar-sesion").classList.remove("d-none");

        // Mostrar "Mis Citas" si ya tiene citas guardadas
        const citas = JSON.parse(localStorage.getItem("misCitas") || "[]");
        if (citas.length > 0) {
            const btnMisCitas = document.getElementById("btn-mis-citas");
            if (btnMisCitas) btnMisCitas.classList.remove("d-none");
        }

    } else {
        document.getElementById("btn-login").classList.remove("d-none");
    }
});

function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioNombre");
    window.location.href = "/Clinica/pages/inicio.html";
}

const usuarioPrueba = {
    correo: "juan@gmail.com",
    password: "1234"
};

document.addEventListener("DOMContentLoaded", function() {
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();

            const correoIngresado   = document.getElementById("correo").value;
            const passwordIngresado = document.getElementById("password").value;
            const alerta            = document.getElementById("alerta-error");

            if (correoIngresado === usuarioPrueba.correo && passwordIngresado === usuarioPrueba.password) {
                localStorage.setItem("sesionActiva", "true");
                localStorage.setItem("usuarioNombre", "Juan");
                window.location.href = "/Clinica/pages/inicio.html";
            } else {
                alerta.classList.remove("d-none");
            }
        });
    }
});

function verificarSesionParaCita() {
    const sesion = localStorage.getItem("sesionActiva");

    if (sesion === "true") {
        const modal = new bootstrap.Modal(document.getElementById("modalCita"));
        modal.show();
    } else {
        const modalAviso = new bootstrap.Modal(document.getElementById("modalSinSesion"));
        modalAviso.show();
    }
}
