const horariosPorMedico = {
    "👨‍⚕️Méd. Joseph": {
        1: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"15:00",label:"03:00 pm"}, {value:"16:00",label:"04:00 pm"} ],
        3: [ {value:"08:00",label:"08:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"14:00",label:"02:00 pm"}, {value:"17:00",label:"05:00 pm"} ],
        5: [ {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"16:00",label:"04:00 pm"} ]
    },
    "👨‍⚕️ Méd. Eduardo": {
        2: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"14:00",label:"02:00 pm"}, {value:"15:00",label:"03:00 pm"} ],
        4: [ {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"16:00",label:"04:00 pm"}, {value:"17:00",label:"05:00 pm"} ],
        6: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"} ]
    },
    "👨‍⚕️ Méd. Ney": {
        1: [ {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"} ],
        3: [ {value:"14:00",label:"02:00 pm"}, {value:"15:00",label:"03:00 pm"}, {value:"16:00",label:"04:00 pm"}, {value:"17:00",label:"05:00 pm"} ],
        5: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"15:00",label:"03:00 pm"} ]
    },
    "👨‍⚕️ Méd. Enrique": {
        2: [ {value:"08:00",label:"08:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"17:00",label:"05:00 pm"} ],
        4: [ {value:"09:00",label:"09:00 am"}, {value:"14:00",label:"02:00 pm"}, {value:"15:00",label:"03:00 pm"} ],
        6: [ {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"} ]
    },
    "👨‍⚕️ Méd. Aaron": {
        1: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"14:00",label:"02:00 pm"} ],
        3: [ {value:"10:00",label:"10:00 am"}, {value:"11:00",label:"11:00 am"}, {value:"15:00",label:"03:00 pm"}, {value:"16:00",label:"04:00 pm"} ],
        5: [ {value:"08:00",label:"08:00 am"}, {value:"09:00",label:"09:00 am"}, {value:"10:00",label:"10:00 am"}, {value:"17:00",label:"05:00 pm"} ]
    }
};

const NOMBRES_DIA = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

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

function abrirEditar(index) {
    const correoActivo = localStorage.getItem("usuarioCorreo") || "guest";
    const citas  = JSON.parse(localStorage.getItem("misCitas_" + correoActivo) || "[]");
    const cita   = citas[index];

    const [dia, mes, anio] = cita.fechaLegible.split("/");
    const fechaISO = `${anio}-${mes.padStart(2,"0")}-${dia.padStart(2,"0")}`;

    document.getElementById("editar-index").value          = index;
    document.getElementById("editar-index").dataset.doctor = cita.doctor;
    document.getElementById("editar-fecha").value          = fechaISO;
    document.getElementById("editar-motivo").value         = cita.motivo;
    document.getElementById("editar-doctor-info").textContent = ` ${cita.doctor}  •  🏥 ${cita.especialidad}`;

    const minFecha = new Date();
    minFecha.setDate(minFecha.getDate() + 3);
    document.getElementById("editar-fecha").min = minFecha.toISOString().split("T")[0];

    actualizarHorasEditar();
    document.getElementById("editar-hora").value = cita.hora;

    new bootstrap.Modal(document.getElementById("modalEditar")).show();
}

function guardarEdicion() {
    const index       = parseInt(document.getElementById("editar-index").value);
    const nuevaFecha  = document.getElementById("editar-fecha").value;
    const nuevaHora   = document.getElementById("editar-hora").value;
    const nuevoMotivo = document.getElementById("editar-motivo").value;

    if (!nuevaFecha || !nuevaHora || !nuevoMotivo) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const doctor = document.getElementById("editar-index").dataset.doctor;
    const [anio, mes, dia] = nuevaFecha.split("-").map(Number);
    const diaSemana = new Date(anio, mes - 1, dia).getDay();
    const horarios  = horariosPorMedico[doctor];

    if (!horarios || !horarios[diaSemana]) {
        alert(`El médico no atiende los ${NOMBRES_DIA[diaSemana]}. Elige otra fecha.`);
        return;
    }

    const fechaLegible = `${String(dia).padStart(2,"0")}/${String(mes).padStart(2,"0")}/${anio}`;

    const correoActivo = localStorage.getItem("usuarioCorreo") || "guest";
    const citasKey = "misCitas_" + correoActivo;
    const citas = JSON.parse(localStorage.getItem(citasKey) || "[]");
    citas[index].fechaLegible = fechaLegible;
    citas[index].hora         = nuevaHora;
    citas[index].motivo       = nuevoMotivo;
    localStorage.setItem(citasKey, JSON.stringify(citas));

    bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
    location.reload();
}

function eliminarCita(index) {
    if (!confirm("¿Seguro que deseas cancelar esta cita?")) return;
    const correoActivo = localStorage.getItem("usuarioCorreo") || "guest";
    const citasKey = "misCitas_" + correoActivo;
    const citas = JSON.parse(localStorage.getItem(citasKey) || "[]");
    citas.splice(index, 1);
    localStorage.setItem(citasKey, JSON.stringify(citas));
    location.reload();
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

    const correoActivo = localStorage.getItem("usuarioCorreo") || "guest";
    const citasKey     = "misCitas_" + correoActivo;
    const citas      = JSON.parse(localStorage.getItem(citasKey) || "[]");
    const contenedor = document.getElementById("lista-citas");

    if (citas.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5 text-muted">
                <div style="font-size:3rem;">📭</div>
                <h5 class="mt-3">No tienes citas programadas</h5>
                <a href="/Clinica/pages/inicio.html" class="btn mt-3 text-white fw-semibold"
                    style="background-color: #0E588E;">
                    📅 Generar una Cita
                </a>
            </div>`;
        return;
    }

    let html = '<div class="row g-4">';
    citas.forEach(function (cita, index) {
        const [dia, mes, anio] = cita.fechaLegible.split("/");
        const fechaCita  = new Date(anio, mes - 1, dia);
        const hoy        = new Date();
        hoy.setHours(0, 0, 0, 0);
        const diffDias   = Math.ceil((fechaCita - hoy) / (1000 * 60 * 60 * 24));
        const puedeEditar = diffDias > 2;

        const key    = cita.nombres + "_" + cita.apellidos + "_" + cita.fechaLegible + "_" + cita.hora;
        const estados = JSON.parse(localStorage.getItem("estadosCitas") || "{}");
        const estado  = estados[key] || "pendiente";

        const badgeEstado = estado === "confirmada"
            ? '<span class="badge bg-success ms-1">✅ Confirmada</span>'
            : estado === "atendida"
            ? '<span class="badge bg-secondary ms-1">🏁 Atendida</span>'
            : '<span class="badge bg-warning text-dark ms-1">⏳ Pendiente</span>';

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
                    <p class="mb-1"><strong>👨‍⚕️ Médico:</strong> ${cita.doctor}</p>
                    <p class="mb-1"><strong>📅 Fecha:</strong> ${cita.fechaLegible}</p>
                    <p class="mb-1"><strong>⏰ Hora:</strong> ${cita.hora}</p>
                    <p class="mb-0"><strong>📝 Motivo:</strong> ${cita.motivo}</p>
                </div>
                <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                    ${puedeEditar && estado !== "atendida"
                        ? `<button class="btn btn-sm btn-outline-primary" onclick="abrirEditar(${index})">✏️ Reprogramar</button>`
                        : estado === "atendida"
                        ? `<span class="text-secondary small fw-semibold">Cita finalizada</span>`
                        : `<span class="text-danger small fw-semibold">⛔ No reprogramable<br>
                            <span class="text-muted fw-normal">Quedan ${diffDias} día(s)</span></span>`
                    }
                    ${estado !== "atendida"
                        ? `<button class="btn btn-sm btn-outline-danger" onclick="eliminarCita(${index})">🗑️ Cancelar</button>`
                        : ""
                    }
                </div>
            </div>
        </div>`;
    });
    html += '</div>';
    contenedor.innerHTML = html;
});