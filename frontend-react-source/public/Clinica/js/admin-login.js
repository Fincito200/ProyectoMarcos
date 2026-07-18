function togglePass() {
    const inp = document.getElementById("admin-password");
    inp.type = inp.type === "password" ? "text" : "password";
}

async function loginAdmin() {
    const correo   = document.getElementById("admin-correo").value.trim();
    const password = document.getElementById("admin-password").value;
    const errEl    = document.getElementById("alerta-error");
    errEl.classList.add("d-none");

    if (!correo || !password) {
        errEl.textContent = "❌ Completa todos los campos.";
        errEl.classList.remove("d-none");
        return;
    }

    try {
        const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/admin/login_admin.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, password })
        });
        const data = await res.json();

        if (data.ok) {
            localStorage.setItem("adminSesion", "true");
            localStorage.setItem("adminNombre", data.nombre);
            localStorage.setItem("adminCorreo", data.correo);
            window.location.href = "/Clinica/pages/admin.html";
        } else {
            errEl.textContent = "❌ " + data.msg;
            errEl.classList.remove("d-none");
        }
    } catch (e) {
        errEl.textContent = "❌ No se pudo conectar con el servidor.";
        errEl.classList.remove("d-none");
    }
}

window.addEventListener("load", function () {
    if (localStorage.getItem("adminSesion") === "true") {
        window.location.href = "/Clinica/pages/admin.html";
    }
});