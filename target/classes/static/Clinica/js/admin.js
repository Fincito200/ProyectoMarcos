const API = "/ProyectoModificado/ProyectoMarcos/Clinica/api/admin";

// UTILIDADES

function cerrarSesionAdmin() {
    localStorage.removeItem("adminSesion");
    localStorage.removeItem("adminNombre");
    localStorage.removeItem("adminCorreo");
    window.location.href = "/Clinica/pages/admin-login.html";
}

function mostrarSeccion(nombre) {
    document.querySelectorAll(".admin-section").forEach(s => s.classList.add("d-none"));
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    document.getElementById("sec-" + nombre).classList.remove("d-none");
    const btns = document.querySelectorAll(".nav-item");
    btns.forEach(b => { if (b.textContent.toLowerCase().includes(nombre === "medicos" ? "médic" : nombre === "especialidades" ? "especial" : nombre === "historial" ? "historial" : "cuenta")) b.classList.add("active"); });

    if (nombre === "medicos")       cargarMedicos();
    if (nombre === "especialidades") cargarEspecialidades();
    if (nombre === "historial")     buscarHistorial();
}

function badgeEstado(estado) {
    const mapa = { pendiente: "badge-pendiente", confirmada: "badge-confirmada", atendida: "badge-atendida" };
    const clase = mapa[estado] || "badge-pendiente";
    return `<span class="${clase}">${estado}</span>`;
}

// MEDICOS 

let medicosData = [];

async function cargarMedicos() {
    const res  = await fetch(`${API}/listar_medicos.php`);
    const data = await res.json();
    medicosData = data.ok ? data.medicos : [];
    renderMedicos(medicosData);
}

function renderMedicos(lista) {
    const tbody = document.getElementById("tbody-medicos");
    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-3">No hay médicos registrados.</td></tr>';
        return;
    }
    tbody.innerHTML = lista.map(m => `
        <tr>
            <td><strong>${m.nombre}</strong></td>
            <td>${m.correo}</td>
            <td>${m.especialidad}</td>
            <td>
                <button class="btn-accion btn-editar" onclick='abrirEditarMedico(${JSON.stringify(m)})'>✏️ Editar</button>
                <button class="btn-accion btn-eliminar" onclick="confirmarEliminarMedico(${m.id}, '${m.nombre}')">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join("");
}

function filtrarMedicos() {
    const q = document.getElementById("buscador-medicos").value.toLowerCase();
    const filtrados = medicosData.filter(m =>
        m.nombre.toLowerCase().includes(q) || m.especialidad.toLowerCase().includes(q)
    );
    renderMedicos(filtrados);
}

async function cargarEspecialidadesSelect(valorSeleccionado = "") {
    const res  = await fetch(`${API}/listar_especialidades.php`);
    const data = await res.json();
    const sel  = document.getElementById("medico-especialidad");
    sel.innerHTML = '<option value="" disabled>Selecciona especialidad</option>';
    if (data.ok) {
        data.especialidades
            .filter(e => e.activa)
            .forEach(e => {
                const opt = document.createElement("option");
                opt.value = e.nombre;
                opt.textContent = e.nombre;
                if (e.nombre === valorSeleccionado) opt.selected = true;
                sel.appendChild(opt);
            });
    }
}

async function abrirModalMedico() {
    document.getElementById("medico-id").value        = "";
    document.getElementById("medico-nombre").value    = "";
    document.getElementById("medico-correo").value    = "";
    document.getElementById("medico-password").value  = "";
    document.getElementById("medico-error").classList.add("d-none");
    document.getElementById("modal-medico-titulo").textContent = "Nuevo Médico";
    document.getElementById("label-pass-medico").textContent   = "Contraseña";
    document.getElementById("hint-pass-medico").classList.add("d-none");
    await cargarEspecialidadesSelect();
    new bootstrap.Modal(document.getElementById("modalMedico")).show();
}

async function abrirEditarMedico(m) {
    document.getElementById("medico-id").value       = m.id;
    document.getElementById("medico-nombre").value   = m.nombre;
    document.getElementById("medico-correo").value   = m.correo;
    document.getElementById("medico-password").value = "";
    document.getElementById("medico-error").classList.add("d-none");
    document.getElementById("modal-medico-titulo").textContent = "Editar Médico";
    document.getElementById("label-pass-medico").textContent   = "Nueva contraseña (opcional)";
    document.getElementById("hint-pass-medico").classList.remove("d-none");
    await cargarEspecialidadesSelect(m.especialidad);
    new bootstrap.Modal(document.getElementById("modalMedico")).show();
}

async function guardarMedico() {
    const id           = document.getElementById("medico-id").value;
    const nombre       = document.getElementById("medico-nombre").value.trim();
    const correo       = document.getElementById("medico-correo").value.trim();
    const especialidad = document.getElementById("medico-especialidad").value;
    const password     = document.getElementById("medico-password").value;
    const errEl        = document.getElementById("medico-error");
    errEl.classList.add("d-none");

    if (!nombre || !correo || !especialidad) {
        errEl.textContent = "❌ Completa todos los campos obligatorios.";
        errEl.classList.remove("d-none");
        return;
    }
    if (!id && !password) {
        errEl.textContent = "❌ La contraseña es obligatoria para nuevos médicos.";
        errEl.classList.remove("d-none");
        return;
    }

    const endpoint = id ? "editar_medico.php" : "crear_medico.php";
    const body     = id
        ? { id: parseInt(id), nombre, correo, especialidad, password_nueva: password }
        : { nombre, correo, especialidad, password };

    const res  = await fetch(`${API}/${endpoint}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
    });
    const data = await res.json();

    if (!data.ok) {
        errEl.textContent = "❌ " + data.msg;
        errEl.classList.remove("d-none");
        return;
    }

    bootstrap.Modal.getInstance(document.getElementById("modalMedico")).hide();
    cargarMedicos();
}

function confirmarEliminarMedico(id, nombre) {
    document.getElementById("confirmar-mensaje").textContent = `¿Eliminar al médico "${nombre}"? Esta acción no se puede deshacer.`;
    document.getElementById("confirmar-btn").onclick = async function() {
        await fetch(`${API}/eliminar_medico.php`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        bootstrap.Modal.getInstance(document.getElementById("modalConfirmar")).hide();
        cargarMedicos();
    };
    new bootstrap.Modal(document.getElementById("modalConfirmar")).show();
}

// ESPECIALIDADES

async function cargarEspecialidades() {
    const res  = await fetch(`${API}/listar_especialidades.php`);
    const data = await res.json();
    const tbody = document.getElementById("tbody-especialidades");

    if (!data.ok || data.especialidades.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-3">No hay especialidades registradas.</td></tr>';
        return;
    }

    tbody.innerHTML = data.especialidades.map(e => `
        <tr>
            <td><strong>${e.nombre}</strong></td>
            <td>${e.descripcion || '<span class="text-muted">—</span>'}</td>
            <td><span class="${e.activa ? 'badge-activa' : 'badge-inactiva'}">${e.activa ? '✅ Activa' : '⏸ Inactiva'}</span></td>
            <td>
                <button class="btn-accion btn-editar" onclick='abrirEditarEspecialidad(${JSON.stringify(e)})'>✏️ Editar</button>
                <button class="btn-accion btn-eliminar" onclick="confirmarEliminarEspecialidad(${e.id}, '${e.nombre}')">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join("");
}

function abrirModalEspecialidad() {
    document.getElementById("esp-id").value          = "";
    document.getElementById("esp-nombre").value      = "";
    document.getElementById("esp-descripcion").value = "";
    document.getElementById("esp-activa").checked    = true;
    document.getElementById("esp-error").classList.add("d-none");
    document.getElementById("modal-esp-titulo").textContent = "Nueva Especialidad";
    new bootstrap.Modal(document.getElementById("modalEspecialidad")).show();
}

function abrirEditarEspecialidad(e) {
    document.getElementById("esp-id").value          = e.id;
    document.getElementById("esp-nombre").value      = e.nombre;
    document.getElementById("esp-descripcion").value = e.descripcion || "";
    document.getElementById("esp-activa").checked    = e.activa;
    document.getElementById("esp-error").classList.add("d-none");
    document.getElementById("modal-esp-titulo").textContent = "Editar Especialidad";
    new bootstrap.Modal(document.getElementById("modalEspecialidad")).show();
}

async function guardarEspecialidad() {
    const id          = document.getElementById("esp-id").value;
    const nombre      = document.getElementById("esp-nombre").value.trim();
    const descripcion = document.getElementById("esp-descripcion").value.trim();
    const activa      = document.getElementById("esp-activa").checked;
    const errEl       = document.getElementById("esp-error");
    errEl.classList.add("d-none");

    if (!nombre) {
        errEl.textContent = "❌ El nombre es obligatorio.";
        errEl.classList.remove("d-none");
        return;
    }

    const endpoint = id ? "editar_especialidad.php" : "crear_especialidad.php";
    const body     = id ? { id: parseInt(id), nombre, descripcion, activa } : { nombre, descripcion };

    const res  = await fetch(`${API}/${endpoint}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
    });
    const data = await res.json();

    if (!data.ok) {
        errEl.textContent = "❌ " + data.msg;
        errEl.classList.remove("d-none");
        return;
    }

    bootstrap.Modal.getInstance(document.getElementById("modalEspecialidad")).hide();
    cargarEspecialidades();
}

function confirmarEliminarEspecialidad(id, nombre) {
    document.getElementById("confirmar-mensaje").textContent = `¿Eliminar la especialidad "${nombre}"?`;
    document.getElementById("confirmar-btn").onclick = async function() {
        await fetch(`${API}/eliminar_especialidad.php`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        bootstrap.Modal.getInstance(document.getElementById("modalConfirmar")).hide();
        cargarEspecialidades();
    };
    new bootstrap.Modal(document.getElementById("modalConfirmar")).show();
}

// HISTORIAL DE CITAS

async function buscarHistorial() {
    const paciente = document.getElementById("filtro-paciente")?.value.trim() || "";
    const medico   = document.getElementById("filtro-medico")?.value.trim()   || "";
    const fecha    = document.getElementById("filtro-fecha")?.value            || "";

    const params = new URLSearchParams({ paciente, medico, fecha });
    const res    = await fetch(`${API}/historial_citas.php?${params}`);
    const data   = await res.json();

    const tbody = document.getElementById("tbody-historial");
    document.getElementById("historial-total").textContent = `${data.total || 0} cita(s)`;

    if (!data.ok || data.citas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-3">No se encontraron citas con esos filtros.</td></tr>';
        return;
    }

    tbody.innerHTML = data.citas.map(c => `
        <tr>
            <td><strong>${c.paciente_nombres} ${c.paciente_apellidos}</strong><br><small class="text-muted">${c.paciente_correo}</small></td>
            <td>${c.paciente_dni}</td>
            <td>${c.medico_nombre}</td>
            <td>${c.especialidad}</td>
            <td>${c.fecha_legible}</td>
            <td>${c.hora}</td>
            <td>${badgeEstado(c.estado)}</td>
            <td><small>${c.motivo || '—'}</small></td>
        </tr>
    `).join("");
}

function limpiarFiltros() {
    document.getElementById("filtro-paciente").value = "";
    document.getElementById("filtro-medico").value   = "";
    document.getElementById("filtro-fecha").value    = "";
    buscarHistorial();
}

// CAMBIAR PASSWORD ADMIN

async function cambiarPasswordAdmin() {
    const correo    = localStorage.getItem("adminCorreo") || "";
    const actual    = document.getElementById("cuenta-actual").value;
    const nueva     = document.getElementById("cuenta-nueva").value;
    const confirmar = document.getElementById("cuenta-confirmar").value;
    const okEl      = document.getElementById("cuenta-exito");
    const errEl     = document.getElementById("cuenta-error");
    okEl.classList.add("d-none");
    errEl.classList.add("d-none");

    if (!actual || !nueva || !confirmar) {
        errEl.textContent = "❌ Completa todos los campos.";
        errEl.classList.remove("d-none");
        return;
    }
    if (nueva !== confirmar) {
        errEl.textContent = "❌ Las contraseñas nuevas no coinciden.";
        errEl.classList.remove("d-none");
        return;
    }

    const res  = await fetch(`${API}/cambiar_password_admin.php`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password_actual: actual, password_nueva: nueva })
    });
    const data = await res.json();

    if (!data.ok) {
        errEl.textContent = "❌ " + data.msg;
        errEl.classList.remove("d-none");
        return;
    }

    okEl.textContent = "✅ Contraseña actualizada correctamente.";
    okEl.classList.remove("d-none");
    document.getElementById("cuenta-actual").value    = "";
    document.getElementById("cuenta-nueva").value     = "";
    document.getElementById("cuenta-confirmar").value = "";
}

// INICIALIZACION

window.addEventListener("load", function() {
    if (localStorage.getItem("adminSesion") !== "true") {
        window.location.href = "/Clinica/pages/admin-login.html";
        return;
    }
    const nombreEl = document.getElementById("admin-nombre-display");
    if (nombreEl) nombreEl.textContent = localStorage.getItem("adminNombre") || "Admin";

    cargarMedicos();
});