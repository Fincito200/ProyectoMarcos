(async function initNotificaciones() {

    const sesion = localStorage.getItem("sesionActiva");
    const tipo   = localStorage.getItem("tipoUsuario");
    const correo = localStorage.getItem("usuarioCorreo") || "";

    if (sesion !== "true" || tipo === "doctor" || !correo) return;

    // MOSTRAR LA CAMPANA EN EL NAVBAR
    const wrapper = document.getElementById("notif-campana-wrapper");
    if (wrapper) wrapper.classList.remove("d-none");

    // OBTENER CITAS DEL PACIENTE
    let citas = [];
    try {
        const res  = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/mis_citas.php?correo=" + encodeURIComponent(correo));
        const data = await res.json();
        citas = data.ok ? data.citas : [];
    } catch (e) {
        citas = [];
    }

    // CALCULAR ALERTAS POR PROXIMIDAD
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const alertas = [];

    citas
        .filter(c => c.estado !== "atendida")
        .forEach(function(cita) {
            const [dia, mes, anio] = cita.fecha_legible.split("/");
            const fechaCita = new Date(anio, mes - 1, dia);
            const diffDias  = Math.ceil((fechaCita - hoy) / (1000 * 60 * 60 * 24));

            if (diffDias === 0) {
                alertas.push({
                    tipo   : "danger",
                    icono  : "🚨",
                    titulo : "¡Cita HOY!",
                    detalle: `${cita.especialidad} con ${cita.medico_nombre} a las ${cita.hora}.`,
                });
            } else if (diffDias === 1) {
                alertas.push({
                    tipo   : "warning",
                    icono  : "⚠️",
                    titulo : "Cita mañana",
                    detalle: `${cita.especialidad} con ${cita.medico_nombre} a las ${cita.hora}.`,
                });
            } else if (diffDias === 2) {
                alertas.push({
                    tipo   : "info",
                    icono  : "📅",
                    titulo : "Cita en 2 días",
                    detalle: `${cita.especialidad} con ${cita.medico_nombre} — ${cita.fecha_legible}.`,
                });
            } else if (diffDias > 0 && diffDias <= 7) {
                alertas.push({
                    tipo   : "primary",
                    icono  : "🗓️",
                    titulo : `Cita en ${diffDias} días`,
                    detalle: `${cita.especialidad} con ${cita.medico_nombre} — ${cita.fecha_legible}.`,
                });
            }
        });

    // BADGE CONTADOR
    const badge = document.getElementById("notif-badge");
    if (badge && alertas.length > 0) {
        badge.textContent = alertas.length > 9 ? "9+" : alertas.length;
        badge.style.display = "flex";
    }

    // ETIQUETA DEL ENCABEZADO DE LA BANDEJA
    const label = document.getElementById("notif-count-label");
    if (label) {
        label.textContent = alertas.length === 0
            ? "Sin alertas"
            : alertas.length + (alertas.length === 1 ? " alerta" : " alertas");
    }

    // RENDERIZAR LISTA
    const lista = document.getElementById("notif-lista");
    if (!lista) return;

    if (alertas.length === 0) {
        lista.innerHTML = `
            <div style="text-align:center; padding:24px 0; color:#aaa;">
                <div style="font-size:2rem; margin-bottom:8px;">🎉</div>
                <p style="margin:0; font-size:0.85rem;">No tienes citas próximas</p>
            </div>`;
        return;
    }

    const colores = {
        danger : { bg: "#fff5f5", borde: "#e74c3c", texto: "#c0392b" },
        warning: { bg: "#fffbf0", borde: "#f39c12", texto: "#b7770d" },
        info   : { bg: "#f0f8ff", borde: "#2980b9", texto: "#1a5276" },
        primary: { bg: "#f0f4ff", borde: "#0E588E", texto: "#0a3760" }
    };

    lista.innerHTML = alertas.map(function(a) {
        const c = colores[a.tipo] || colores.primary;
        return `
            <div style="
                background:${c.bg};
                border-left:4px solid ${c.borde};
                border-radius:8px;
                padding:10px 12px;
                margin-bottom:8px;
                display:flex;
                gap:10px;
                align-items:flex-start;">
                <span style="font-size:1.25rem; line-height:1.2;">${a.icono}</span>
                <div>
                    <div style="font-weight:700; font-size:0.83rem; color:${c.texto};">${a.titulo}</div>
                    <div style="font-size:0.78rem; color:#555; margin-top:2px;">${a.detalle}</div>
                </div>
            </div>`;
    }).join("");

})();

// MOSTRAR / OCULTAR BANDEJA
function toggleBandeja() {
    const bandeja = document.getElementById("notif-bandeja");
    if (!bandeja) return;
    bandeja.style.display = bandeja.style.display === "block" ? "none" : "block";
}

// CERRAR BANDEJA AL HACER CLIC FUERA
document.addEventListener("click", function(e) {
    const wrapper = document.getElementById("notif-campana-wrapper");
    const bandeja = document.getElementById("notif-bandeja");
    if (wrapper && bandeja && !wrapper.contains(e.target)) {
        bandeja.style.display = "none";
    }
});