let filtroActivo = "todas";

window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");

    if (sesion !== "true" || tipo !== "doctor") {
        window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/login.html";
        return;
    }

    const nombre = localStorage.getItem("doctorNombre") || "Doctor";
    document.getElementById("titulo-bienvenida").textContent = "👨‍⚕️ Bienvenido, " + nombre;
    document.getElementById("nav-nombre-doctor").textContent = nombre;

    renderCitas();
});

async function getCitasDoctor() {
    const doctorNombre = localStorage.getItem("doctorNombre") || "";
    try {
        const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/citas_doctor.php?nombre=" + encodeURIComponent(doctorNombre));
        const data = await res.json();
        return data.ok ? data.citas : [];
    } catch (err) {
        return [];
    }
}

function citaKey(cita) {
    return cita.nombres + "_" + cita.apellidos + "_" + cita.fecha_legible + "_" + cita.hora;
}

function filtrarCitas(filtro, btn) {
    filtroActivo = filtro;
    document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderCitas();
}

async function renderCitas() {
    const citas    = await getCitasDoctor();
    const busqueda = (document.getElementById("buscar-paciente")?.value || "").toLowerCase();

    const filtradas = citas.filter(c => {
        const matchFiltro   = filtroActivo === "todas" || c.estado === filtroActivo;
        const matchBusqueda = !busqueda ||
            (c.nombres + " " + c.apellidos).toLowerCase().includes(busqueda) ||
            (c.especialidad || "").toLowerCase().includes(busqueda);
        return matchFiltro && matchBusqueda;
    });

    document.getElementById("total-citas").textContent      = citas.length;
    document.getElementById("citas-pendientes").textContent  = citas.filter(c => c.estado === "pendiente").length;
    document.getElementById("citas-confirmadas").textContent = citas.filter(c => c.estado === "confirmada").length;
    document.getElementById("citas-atendidas").textContent   = citas.filter(c => c.estado === "atendida").length;

    const contenedor = document.getElementById("lista-citas-doctor");

    if (filtradas.length === 0) {
        contenedor.innerHTML = `
            <div class="empty-state">
                <div class="icon">📭</div>
                <h5>No hay citas${filtroActivo !== "todas" ? " con estado: " + filtroActivo : ""}</h5>
                <p class="text-muted small">Las citas de tus pacientes aparecerán aquí</p>
            </div>`;
        return;
    }

    let html = '<div class="row g-3">';
    filtradas.forEach(function (cita) {
        const estado = cita.estado || "pendiente";

        const estadoBadge = estado === "pendiente"
            ? '<span class="badge-estado estado-pendiente">⏳ Pendiente</span>'
            : estado === "confirmada"
            ? '<span class="badge-estado estado-confirmada">✅ Confirmada</span>'
            : '<span class="badge-estado estado-atendida">🏁 Atendida</span>';

        const acciones = estado === "pendiente"
            ? `<button class="btn-confirmar" onclick="cambiarEstado(${cita.id}, 'confirmada')">✅ Confirmar</button>
                <button class="btn-cancelar-doc ms-auto" onclick="cambiarEstado(${cita.id}, 'atendida')">🏁 Marcar atendida</button>`
            : estado === "confirmada"
            ? `<button class="btn-atender" onclick="cambiarEstado(${cita.id}, 'atendida')">🏁 Marcar atendida</button>`
            : `<span class="text-muted small">Cita finalizada</span>`;

        const citaDataStr = encodeURIComponent(JSON.stringify(cita));

        html += `
        <div class="col-12 col-md-6 col-xl-4">
            <div class="cita-card">
                <div class="cita-header">
                    <span class="cita-especialidad">🏥 ${cita.especialidad}</span>
                    ${estadoBadge}
                </div>
                <div class="cita-body">
                    <p class="dato"><strong>👤 Paciente:</strong> ${cita.nombres} ${cita.apellidos}</p>
                    <p class="dato"><strong>📅 Fecha:</strong> ${cita.fecha_legible} &nbsp; <strong>⏰</strong> ${cita.hora}</p>
                    <p class="dato"><strong>📝 Motivo:</strong> ${cita.motivo}</p>
                    ${cita.dni ? `<p class="dato"><strong>🪪 DNI:</strong> ${cita.dni}</p>` : ""}
                </div>
                <div class="cita-footer">
                    ${acciones}
                    <button class="btn btn-sm btn-outline-secondary ms-1" onclick="verDetalle('${citaDataStr}')">🔍</button>
                </div>
            </div>
        </div>`;
    });
    html += '</div>';
    contenedor.innerHTML = html;
}

async function cambiarEstado(id, nuevoEstado) {
    try {
        const res = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/actualizar_estado.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, estado: nuevoEstado })
        });
        const data = await res.json();
        if (!data.ok) {
            alert("Error al actualizar: " + (data.msg || "intenta de nuevo"));
            return;
        }
    } catch (err) {
        alert("No se pudo conectar con el servidor.");
        return;
    }
    renderCitas();
}

function verDetalle(dataStr) {
    const cita = JSON.parse(decodeURIComponent(dataStr));
    document.getElementById("detalle-body").innerHTML = `
        <div class="mb-2"><strong>👤 Nombre:</strong> ${cita.nombres} ${cita.apellidos}</div>
        ${cita.dni      ? `<div class="mb-2"><strong>🪪 DNI:</strong> ${cita.dni}</div>`           : ""}
        ${cita.telefono ? `<div class="mb-2"><strong>📞 Teléfono:</strong> ${cita.telefono}</div>` : ""}
        ${cita.correo   ? `<div class="mb-2"><strong>📧 Correo:</strong> ${cita.correo}</div>`     : ""}
        <hr>
        <div class="mb-2"><strong>🏥 Especialidad:</strong> ${cita.especialidad}</div>
        <div class="mb-2"><strong>👨‍⚕️ Médico:</strong> ${cita.medico_nombre}</div>
        <div class="mb-2"><strong>📅 Fecha:</strong> ${cita.fecha_legible}</div>
        <div class="mb-2"><strong>⏰ Hora:</strong> ${cita.hora}</div>
        <div class="mb-0"><strong>📝 Motivo:</strong> ${cita.motivo}</div>
    `;
    new bootstrap.Modal(document.getElementById("modalDetalle")).show();
}

function cerrarSesionDoctor() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("doctorNombre");
    localStorage.removeItem("usuarioCorreo");
    localStorage.removeItem("estadosCitas");
    window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/login.html";
}