document.addEventListener("DOMContentLoaded", function () {
    const formCita = document.getElementById("formCita");
    if (!formCita) return;

    formCita.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nombres      = formCita.querySelector("[name='nombres']").value;
        const apellidos    = formCita.querySelector("[name='apellidos']").value;
        const dni          = formCita.querySelector("[name='dni']").value;
        const telefono     = formCita.querySelector("[name='telefono']").value;
        const correo       = formCita.querySelector("[name='correo']").value;
        const especialidad = formCita.querySelector("[name='especialidad'] option:checked")?.text || "";
        const doctor       = formCita.querySelector("[name='doctor'] option:checked")?.text || "";
        const fecha        = formCita.querySelector("[name='fecha']").value;
        const hora         = formCita.querySelector("[name='hora'] option:checked")?.text || "";
        const horaValue    = formCita.querySelector("[name='hora']").value;
        const motivo       = formCita.querySelector("[name='motivo']").value;

        const [anio, mes, dia] = fecha.split("-");
        const fechaLegible = `${dia}/${mes}/${anio}`;

        // GUARDA EN POSTGRESQL VIA PHP
        try {
                const res = await fetch("/ProyectoModificado/ProyectoMarcos/Clinica/api/guardar_cita.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correo,
                    doctor,
                    especialidad,
                    fecha,        // YYYY-MM-DD PARA LA BD
                    hora: horaValue,
                    motivo
                })
            });

            const data = await res.json();

            if (!data.ok) {
                alert("❌ Error al guardar la cita: " + (data.msg || "Intenta de nuevo."));
                return;
            }
        } catch (err) {
            alert("❌ No se pudo conectar con el servidor. Verifica que PHP esté corriendo.");
            return;
        }

        // TAMBIEN GUARDAR EL localStorage PARA QUE mis-citas.js LO MUESTRE
        const nuevaCita = { nombres, apellidos, dni, telefono, correo, especialidad, doctor, fechaLegible, hora, motivo };
        const usuarioCorreo = localStorage.getItem("usuarioCorreo") || "guest";
        const citasKey = "misCitas_" + usuarioCorreo;
        const citasGuardadas = JSON.parse(localStorage.getItem(citasKey) || "[]");
        citasGuardadas.push(nuevaCita);
        localStorage.setItem(citasKey, JSON.stringify(citasGuardadas));

        // MOSTRAR BOTON DE MIS CITAS
        const btnMisCitas = document.getElementById("btn-mis-citas");
        if (btnMisCitas) btnMisCitas.classList.remove("d-none");

        // MOSTRAR RESUMEN
        document.getElementById("resumen-cita").innerHTML = `
            <p class="mb-1"><strong><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'10'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M8%2048%20C8%2036%2044%2036%2044%2048'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'6'%20fill%3D'%2329A8EF'%20opacity%3D'.4'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> Paciente:</strong> ${nombres} ${apellidos}</p>
            <p class="mb-1"><strong>🏥 Especialidad:</strong> ${especialidad}</p>
            <p class="mb-1"><strong><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'11'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M13%2035%20C13%2028%2039%2028%2039%2035%20L39%2046%20L13%2046%20Z'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2018%2038%2018%2042%20C18%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2026%2038%2026%2042%20C26%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Ccircle%20cx%3D'22'%20cy%3D'46'%20r%3D'2'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> Médico:</strong> ${doctor}</p>
            <p class="mb-1"><strong>📅 Fecha:</strong> ${fechaLegible} &nbsp; <strong>⏰ Hora:</strong> ${hora}</p>
            <p class="mb-0"><strong>📝 Motivo:</strong> ${motivo}</p>
        `;

        bootstrap.Modal.getInstance(document.getElementById("modalCita"))?.hide();
        setTimeout(() => {
            new bootstrap.Modal(document.getElementById("modalCitaExito")).show();
            formCita.reset();
            document.getElementById("doctor").innerHTML = '<option value="" disabled selected>Selecciona un Médico</option>';
            document.querySelector("select[name='hora']").innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';
        }, 400);
    });
});