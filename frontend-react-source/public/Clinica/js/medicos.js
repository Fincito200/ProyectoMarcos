var BASE_API = "/ProyectoModificado/ProyectoMarcos/Clinica/api";

var especialidadSelect = document.getElementById("especialidad");
var doctorSelect       = document.getElementById("doctor");
var fechaInput         = document.querySelector("input[name='fecha']");
var horaSelect         = document.querySelector("select[name='hora']");

// Horarios por médico y día de semana (0=Dom … 6=Sáb)
// Se mantiene para médicos ya existentes; médicos nuevos reciben horario genérico
var horariosPorMedico = {
    "Méd. Joseph": {
        1: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"10:00",label:"10:00 am"},{value:"15:00",label:"03:00 pm"},{value:"16:00",label:"04:00 pm"}],
        3: [{value:"08:00",label:"08:00 am"},{value:"11:00",label:"11:00 am"},{value:"14:00",label:"02:00 pm"},{value:"17:00",label:"05:00 pm"}],
        5: [{value:"09:00",label:"09:00 am"},{value:"10:00",label:"10:00 am"},{value:"11:00",label:"11:00 am"},{value:"16:00",label:"04:00 pm"}]
    },
    "Méd. Eduardo": {
        2: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"14:00",label:"02:00 pm"},{value:"15:00",label:"03:00 pm"}],
        4: [{value:"10:00",label:"10:00 am"},{value:"11:00",label:"11:00 am"},{value:"16:00",label:"04:00 pm"},{value:"17:00",label:"05:00 pm"}],
        6: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"10:00",label:"10:00 am"}]
    },
    "Méd. Ney": {
        1: [{value:"09:00",label:"09:00 am"},{value:"10:00",label:"10:00 am"},{value:"11:00",label:"11:00 am"}],
        3: [{value:"14:00",label:"02:00 pm"},{value:"15:00",label:"03:00 pm"},{value:"16:00",label:"04:00 pm"},{value:"17:00",label:"05:00 pm"}],
        5: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"15:00",label:"03:00 pm"}]
    },
    "Méd. Enrique": {
        2: [{value:"08:00",label:"08:00 am"},{value:"10:00",label:"10:00 am"},{value:"11:00",label:"11:00 am"},{value:"17:00",label:"05:00 pm"}],
        4: [{value:"09:00",label:"09:00 am"},{value:"14:00",label:"02:00 pm"},{value:"15:00",label:"03:00 pm"}],
        6: [{value:"09:00",label:"09:00 am"},{value:"10:00",label:"10:00 am"}]
    },
    "Méd. Aaron": {
        1: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"14:00",label:"02:00 pm"}],
        3: [{value:"10:00",label:"10:00 am"},{value:"11:00",label:"11:00 am"},{value:"15:00",label:"03:00 pm"},{value:"16:00",label:"04:00 pm"}],
        5: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"10:00",label:"10:00 am"},{value:"17:00",label:"05:00 pm"}]
    }
};

// Horario genérico para médicos nuevos agregados desde el admin
var horarioGenerico = {
    1: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"10:00",label:"10:00 am"},{value:"11:00",label:"11:00 am"}],
    2: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"14:00",label:"02:00 pm"},{value:"15:00",label:"03:00 pm"}],
    3: [{value:"10:00",label:"10:00 am"},{value:"11:00",label:"11:00 am"},{value:"16:00",label:"04:00 pm"},{value:"17:00",label:"05:00 pm"}],
    4: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"},{value:"14:00",label:"02:00 pm"}],
    5: [{value:"09:00",label:"09:00 am"},{value:"10:00",label:"10:00 am"},{value:"11:00",label:"11:00 am"}],
    6: [{value:"08:00",label:"08:00 am"},{value:"09:00",label:"09:00 am"}]
};

var NOMBRES_DIA = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

// ── CARGAR ESPECIALIDADES DESDE LA BD ─────────────────────────────
async function cargarEspecialidades() {
    try {
        const res  = await fetch(`${BASE_API}/listar_especialidades.php`);
        const data = await res.json();
        if (!data.ok) return;

        especialidadSelect.innerHTML = '<option value="" disabled selected>Selecciona una especialidad</option>';

        data.especialidades
            .filter(e => e.activa)
            .forEach(e => {
                const opt = document.createElement("option");
                // value en minúsculas-sin-tilde para compatibilidad con la BD de horarios
                opt.value       = e.nombre;
                opt.textContent = e.nombre;
                especialidadSelect.appendChild(opt);
            });
    } catch (err) {
        console.error("Error cargando especialidades:", err);
    }
}

function normalizar(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// ── CARGAR MÉDICOS DESDE LA BD SEGÚN ESPECIALIDAD ─────────────────
async function cargarMedicos(especialidad) {
    doctorSelect.innerHTML = '<option value="" disabled selected>Cargando médicos…</option>';
    horaSelect.innerHTML   = '<option value="" disabled selected>Selecciona una hora</option>';

    try {
        const res  = await fetch(`${BASE_API}/listar_medicos.php`);
        const data = await res.json();
        if (!data.ok) return;

        // Comparación normalizada: ignora acentos y mayúsculas
        const medicos = data.medicos.filter(
            m => normalizar(m.especialidad) === normalizar(especialidad)
        );

        doctorSelect.innerHTML = '<option value="" disabled selected>Selecciona un Médico</option>';

        if (medicos.length === 0) {
            const opt = document.createElement("option");
            opt.disabled    = true;
            opt.textContent = "No hay médicos para esta especialidad";
            doctorSelect.appendChild(opt);
            return;
        }

        medicos.forEach(m => {
            const opt       = document.createElement("option");
            opt.value       = m.nombre;
            opt.textContent = m.nombre;
            doctorSelect.appendChild(opt);
        });
    } catch (err) {
        console.error("Error cargando médicos:", err);
        doctorSelect.innerHTML = '<option value="" disabled selected>Error al cargar médicos</option>';
    }
}

// ── ACTUALIZAR HORAS SEGÚN MÉDICO Y FECHA ─────────────────────────
function actualizarHoras() {
    const doctorVal = doctorSelect.value;
    const fechaVal  = fechaInput.value;

    horaSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';

    if (!doctorVal || !fechaVal) return;

    const [anio, mes, dia] = fechaVal.split("-").map(Number);
    const diaSemana = new Date(anio, mes - 1, dia).getDay();

    // Usar horario específico del médico si existe, sino el genérico
    const horarios = horariosPorMedico[doctorVal] || horarioGenerico;

    if (!horarios[diaSemana]) {
        const opt       = document.createElement("option");
        opt.disabled    = true;
        const disponibles = Object.keys(horarios).map(d => NOMBRES_DIA[d]).join(", ");
        opt.textContent = `⚠️ El médico no atiende los ${NOMBRES_DIA[diaSemana]}. Días disponibles: ${disponibles}`;
        horaSelect.appendChild(opt);
        return;
    }

    horarios[diaSemana].forEach(h => {
        const opt       = document.createElement("option");
        opt.value       = h.value;
        opt.textContent = h.label;
        horaSelect.appendChild(opt);
    });
}

// ── EVENTOS ───────────────────────────────────────────────────────
especialidadSelect.addEventListener("change", function () {
    cargarMedicos(this.value);
});

doctorSelect.addEventListener("change", actualizarHoras);
fechaInput.addEventListener("change",   actualizarHoras);

// ── INIT ──────────────────────────────────────────────────────────
cargarEspecialidades();