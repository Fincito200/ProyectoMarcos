const horariosPorMedico = {
    "Méd. Joseph": {
        1: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"15:00",label:"03:00 pm"}, {value:"16:00",label:"04:00 pm"} ],
        3: [ {value:"08:00",label:"08:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"14:00",label:"02:00 pm"}, {value:"17:00",label:"05:00 pm"} ],
        5: [ {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"16:00",label:"04:00 pm"} ]
    },
    "Méd. Eduardo": {
        2: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"14:00",label:"02:00 pm"}, {value:"15:00",label:"03:00 pm"} ],
        4: [ {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"16:00",label:"04:00 pm"}, {value:"17:00",label:"05:00 pm"} ],
        6: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"} ]
    },
    "Méd. Ney": {
        1: [ {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"} ],
        3: [ {value:"14:00",label:"02:00 pm"}, {value:"15:00",label:"03:00 pm"}, {value:"16:00",label:"04:00 pm"}, {value:"17:00",label:"05:00 pm"} ],
        5: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"15:00",label:"03:00 pm"} ]
    },
    "Méd. Enrique": {
        2: [ {value:"08:00",label:"08:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"17:00",label:"05:00 pm"} ],
        4: [ {value:"09:00",label:"09:00 am"}, {value:"14:00",label:"02:00 pm"}, {value:"15:00",label:"03:00 pm"} ],
        6: [ {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"} ]
    },
    "Méd. Aaron": {
        1: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"14:00",label:"02:00 pm"} ],
        3: [ {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"15:00",label:"03:00 pm"}, {value:"16:00",label:"04:00 pm"} ],
        5: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"17:00",label:"05:00 pm"} ]
    }
};

const NOMBRES_DIA = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

async function getCitasPaciente() {
    const correo = localStorage.getItem("usuarioCorreo") || "";
    try {
        const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/mis_citas.php?correo=" + encodeURIComponent(correo));
        const data = await res.json();
        return data.ok ? data.citas : [];
    } catch (err) {
        return [];
    }
}

async function eliminarCita(id) {
    if (!confirm("¿Seguro que deseas cancelar esta cita?")) return;
    try {
        await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/eliminar_cita.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        });
    } catch (err) {
        alert("No se pudo conectar con el servidor.");
        return;
    }
    location.reload();
}

function actualizarHorasEditar() {
    const doctor     = document.getElementById("editar-index").dataset.doctor;
    const fechaVal   = document.getElementById("editar-fecha").value;
    const horaSelect = document.getElementById("editar-hora");
    const aviso      = document.getElementById("editar-aviso-dia");

    horaSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';
    aviso.textContent = "";

    if (!fechaVal) return;

    const [anio, mes, dia] = fechaVal.split("-").map(Number);
    const diaSemana = new Date(anio, mes - 1, dia).getDay();
    const horarios  = horariosPorMedico[doctor];

    if (!horarios || !horarios[diaSemana]) {
        const opt = document.createElement("option");
        opt.disabled = true;
        opt.textContent = `⚠️ ${NOMBRES_DIA[diaSemana]}: el médico no atiende este día`;
        horaSelect.appendChild(opt);
        const diasDisponibles = Object.keys(horarios || {}).map(d => NOMBRES_DIA[d]).join(", ");
        aviso.textContent = `⚠️ ${doctor} no atiende los ${NOMBRES_DIA[diaSemana]}. Días disponibles: ${diasDisponibles}`;
        return;
    }

    horarios[diaSemana].forEach(h => {
        const opt = document.createElement("option");
        opt.value = h.value;
        opt.textContent = h.label;
        horaSelect.appendChild(opt);
    });
}

function abrirEditar(id, medico, fechaLegible, hora, motivo) {
    const [dia, mes, anio] = fechaLegible.split("/");
    const fechaISO = `${anio}-${mes.padStart(2,"0")}-${dia.padStart(2,"0")}`;

    document.getElementById("editar-index").value          = id;
    document.getElementById("editar-index").dataset.doctor = medico;
    document.getElementById("editar-fecha").value          = fechaISO;
    document.getElementById("editar-motivo").value         = motivo;
    document.getElementById("editar-doctor-info").textContent = ` ${medico}`;

    const minFecha = new Date();
    minFecha.setDate(minFecha.getDate() + 3);
    document.getElementById("editar-fecha").min = minFecha.toISOString().split("T")[0];

    actualizarHorasEditar();
    document.getElementById("editar-hora").value = hora;

    new bootstrap.Modal(document.getElementById("modalEditar")).show();
}

async function guardarEdicion() {
    const id          = parseInt(document.getElementById("editar-index").value);
    const nuevaFecha  = document.getElementById("editar-fecha").value;
    const nuevaHora   = document.getElementById("editar-hora").value;
    const nuevoMotivo = document.getElementById("editar-motivo").value;
    const doctor      = document.getElementById("editar-index").dataset.doctor;

    if (!nuevaFecha || !nuevaHora || !nuevoMotivo) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const [anio, mes, dia] = nuevaFecha.split("-").map(Number);
    const diaSemana = new Date(anio, mes - 1, dia).getDay();
    const horarios  = horariosPorMedico[doctor];

    if (!horarios || !horarios[diaSemana]) {
        alert(`El médico no atiende los ${NOMBRES_DIA[diaSemana]}. Elige otra fecha.`);
        return;
    }

    try {
        await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/editar_cita.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, fecha: nuevaFecha, hora: nuevaHora, motivo: nuevoMotivo })
        });
    } catch (err) {
        alert("No se pudo conectar con el servidor.");
        return;
    }

    bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
    location.reload();
}

window.addEventListener("load", async function () {
    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    const nombre = localStorage.getItem("usuarioNombre");

    if (sesion !== "true" || tipo === "doctor") {
        window.location.href = "/ProyectoModificado/ProyectoMarcos/Clinica/pages/login.html";
        return;
    }

    const saludo = document.getElementById("saludo-usuario");
    if (saludo) { saludo.classList.remove("d-none"); saludo.textContent = "👋 Hola, " + nombre; }

    const btnCerrar = document.getElementById("btn-cerrar-sesion");
    if (btnCerrar) btnCerrar.classList.remove("d-none");

    const citas      = await getCitasPaciente();
    const contenedor = document.getElementById("lista-citas");

    if (citas.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5 text-muted">
                <div style="font-size:3rem;">📭</div>
                <h5 class="mt-3">No tienes citas programadas</h5>
                <a href="/ProyectoModificado/ProyectoMarcos/Clinica/pages/inicio.html" class="btn mt-3 text-white fw-semibold"
                    style="background-color: #0E588E;">
                    📅 Generar una Cita
                </a>
            </div>`;
        return;
    }

    let html = '<div class="row g-4">';
    citas.forEach(function (cita) {
        const [dia, mes, anio] = cita.fecha_legible.split("/");
        const fechaCita  = new Date(anio, mes - 1, dia);
        const hoy        = new Date();
        hoy.setHours(0, 0, 0, 0);
        const diffDias   = Math.ceil((fechaCita - hoy) / (1000 * 60 * 60 * 24));
        const puedeEditar = diffDias > 2;
        const estado      = cita.estado || "pendiente";

        const badgeEstado = estado === "confirmada"
            ? '<span class="badge bg-success ms-1">✅ Confirmada</span>'
            : estado === "atendida"
            ? '<span class="badge bg-secondary ms-1">🏁 Atendida</span>'
            : '<span class="badge bg-warning text-dark ms-1">⏳ Pendiente</span>';

        // Nombre del médico sin emoji para buscar horarios
        const medicoLimpio = cita.medico_nombre.replace(/[^\x00-\x7F]/g, "").trim();

        html += `
        <div class="col-md-6 col-lg-4">
            <div class="card shadow-sm h-100 border-0">
                <div class="card-header text-white fw-semibold d-flex justify-content-between align-items-center"
                        style="background-color: #0E588E;">
                    <span>🏥 ${cita.especialidad}</span>
                    ${badgeEstado}
                </div>
                <div class="card-body small">
                    <p class="mb-1"><strong>👤 Paciente:</strong> ${cita.nombres} ${cita.apellidos}</p>
                    <p class="mb-1"><strong>👨‍⚕️ Médico:</strong> ${cita.medico_nombre}</p>
                    <p class="mb-1"><strong>📅 Fecha:</strong> ${cita.fecha_legible}</p>
                    <p class="mb-1"><strong>⏰ Hora:</strong> ${cita.hora}</p>
                    <p class="mb-0"><strong>📝 Motivo:</strong> ${cita.motivo}</p>
                </div>
                <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                    ${estado === "atendida"
                        ? `<span class="text-secondary small fw-semibold">Cita finalizada</span>`
                        : puedeEditar
                        ? `<button class="btn btn-sm btn-outline-primary" onclick="abrirEditar(${cita.id}, '${medicoLimpio}', '${cita.fecha_legible}', '${cita.hora}', '${cita.motivo}')">✏️ Reprogramar</button>`
                        : `<span class="text-danger small fw-semibold">⛔ No reprogramable<br>
                            <span class="text-muted fw-normal">Quedan ${diffDias} día(s)</span></span>`
                    }
                    ${estado !== "atendida"
                        ? `<button class="btn btn-sm btn-outline-danger" onclick="eliminarCita(${cita.id})">🗑️ Cancelar</button>`
                        : ""
                    }
                </div>
            </div>
        </div>`;
    });
    html += '</div>';
    contenedor.innerHTML = html;
});