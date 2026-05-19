let filtroActivo = "todas";
let citaComentarioId = null;

window.addEventListener("load", function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");

    if (sesion !== "true" || tipo !== "doctor") {
        window.location.href = "/Clinica/pages/login.html";
        return;
    }

    const nombre = localStorage.getItem("doctorNombre") || "Doctor";
    document.getElementById("titulo-bienvenida").textContent = "<img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'11'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M13%2035%20C13%2028%2039%2028%2039%2035%20L39%2046%20L13%2046%20Z'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2018%2038%2018%2042%20C18%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2026%2038%2026%2042%20C26%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Ccircle%20cx%3D'22'%20cy%3D'46'%20r%3D'2'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> Bienvenido, " + nombre;
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

        const comentarioBadge = cita.comentario
            ? `<span class="badge bg-info text-dark ms-1" style="font-size:0.7rem;">💬 Con comentario</span>`
            : "";

        const citaDataStr = encodeURIComponent(JSON.stringify(cita));

        html += `
        <div class="col-12 col-md-6 col-xl-4">
            <div class="cita-card">
                <div class="cita-header">
                    <span class="cita-especialidad">🏥 ${cita.especialidad}</span>
                    <div class="d-flex align-items-center gap-1">
                        ${estadoBadge}
                        ${comentarioBadge}
                    </div>
                </div>
                <div class="cita-body">
                    <p class="dato"><strong><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'10'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M8%2048%20C8%2036%2044%2036%2044%2048'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'6'%20fill%3D'%2329A8EF'%20opacity%3D'.4'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> Paciente:</strong> ${cita.nombres} ${cita.apellidos}</p>
                    <p class="dato"><strong>📅 Fecha:</strong> ${cita.fecha_legible} &nbsp; <strong>⏰</strong> ${cita.hora}</p>
                    <p class="dato"><strong>📝 Motivo:</strong> ${cita.motivo}</p>
                    ${cita.dni ? `<p class="dato"><strong>🪪 DNI:</strong> ${cita.dni}</p>` : ""}
                    ${cita.comentario ? `<p class="dato border-top pt-2 mt-2"><strong>💬 Comentario:</strong> ${cita.comentario}</p>` : ""}
                </div>
                <div class="cita-footer">
                    ${acciones}
                    <button class="btn btn-sm btn-outline-info ms-1" onclick="abrirComentario(${cita.id}, '${cita.nombres} ${cita.apellidos}', '${(cita.comentario || "").replace(/'/g, "\\'")}')">💬</button>
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

function abrirComentario(id, paciente, comentarioActual) {
    citaComentarioId = id;
    document.getElementById("comentario-paciente").value = paciente;
    document.getElementById("comentario-texto").value    = comentarioActual || "";
    document.getElementById("comentario-exito").classList.add("d-none");
    document.getElementById("comentario-error").classList.add("d-none");
    new bootstrap.Modal(document.getElementById("modalComentario")).show();
}

async function guardarComentario() {
    const comentario = document.getElementById("comentario-texto").value.trim();
    const exitoEl    = document.getElementById("comentario-exito");
    const errorEl    = document.getElementById("comentario-error");

    try {
        const res = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/guardar_comentario.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: citaComentarioId, comentario })
        });
        const data = await res.json();

        if (data.ok) {
            exitoEl.classList.remove("d-none");
            errorEl.classList.add("d-none");
            setTimeout(() => {
                bootstrap.Modal.getInstance(document.getElementById("modalComentario")).hide();
                renderCitas();
            }, 1500);
        } else {
            errorEl.classList.remove("d-none");
        }
    } catch (err) {
        errorEl.classList.remove("d-none");
    }
}

function verDetalle(dataStr) {
    const cita = JSON.parse(decodeURIComponent(dataStr));
    document.getElementById("detalle-body").innerHTML = `
        <div class="mb-2"><strong><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'10'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M8%2048%20C8%2036%2044%2036%2044%2048'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'6'%20fill%3D'%2329A8EF'%20opacity%3D'.4'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> Nombre:</strong> ${cita.nombres} ${cita.apellidos}</div>
        ${cita.dni      ? `<div class="mb-2"><strong>🪪 DNI:</strong> ${cita.dni}</div>`           : ""}
        ${cita.telefono ? `<div class="mb-2"><strong><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M16%2016%20C18%2020%2022%2024%2026%2026%20C30%2028%2034%2030%2036%2034%20L32%2038%20C28%2036%2020%2028%2014%2020%20Z'%20fill%3D'%2329A8EF'%2F%3E%3Cpath%20d%3D'M34%2034%20L38%2030%20C40%2032%2042%2034%2040%2038%20C38%2042%2032%2044%2026%2040'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M16%2016%20L20%2012%20C22%2010%2024%2012%2026%2014%20C22%2018%2018%2020%2016%2016Z'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> Teléfono:</strong> ${cita.telefono}</div>` : ""}
        ${cita.correo   ? `<div class="mb-2"><strong>📧 Correo:</strong> ${cita.correo}</div>`     : ""}
        <hr>
        <div class="mb-2"><strong>🏥 Especialidad:</strong> ${cita.especialidad}</div>
        <div class="mb-2"><strong><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'11'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M13%2035%20C13%2028%2039%2028%2039%2035%20L39%2046%20L13%2046%20Z'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2018%2038%2018%2042%20C18%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2026%2038%2026%2042%20C26%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Ccircle%20cx%3D'22'%20cy%3D'46'%20r%3D'2'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> Médico:</strong> ${cita.medico_nombre}</div>
        <div class="mb-2"><strong>📅 Fecha:</strong> ${cita.fecha_legible}</div>
        <div class="mb-2"><strong>⏰ Hora:</strong> ${cita.hora}</div>
        <div class="mb-2"><strong>📝 Motivo:</strong> ${cita.motivo}</div>
        ${cita.comentario ? `<hr><div class="mb-0"><strong>💬 Comentario del doctor:</strong><br>${cita.comentario}</div>` : ""}
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
    window.location.href = "/Clinica/pages/login.html";
}