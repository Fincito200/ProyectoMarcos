const especialidadSelect = document.getElementById("especialidad");
const doctorSelect = document.getElementById("doctor");
const fechaInput = document.querySelector("input[name='fecha']");
const horaSelect = document.querySelector("select[name='hora']");

const doctores = {
    medicina_general: [
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Joseph", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Joseph" },
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Eduardo", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Eduardo" }
    ],
    cardiologia: [
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Ney", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Ney" }
    ], 
    pediatria: [
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Enrique", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Enrique" }
    ],
    ginecologia: [
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Aaron", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Aaron" }
    ],
    traumatologia: [
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Joseph", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Joseph" }
    ],
    neurologia: [
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Ney", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Ney" }
    ],
    oftalmologia: [
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Eduardo", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Eduardo" }
    ],
    dermatologia: [
        { value: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Enrique", nombre: "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Enrique" }
    ]
};

// HORARIOS POR MEDICO Y DIA
// 0=Dom 1=Lun 2=Mar 3=Mie 4=Jue 5=Vie 6=Sab
const horariosPorMedico = {

    "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Joseph": {
        1: [
            { value: "08:00", label: "08:00 am" },
            { value: "09:00", label: "09:00 am" },
            { value: "10:00", label: "10:00 am" },
            { value: "15:00", label: "03:00 pm" },
            { value: "16:00", label: "04:00 pm" }
        ],
        3: [
            { value: "08:00", label: "08:00 am" },
            { value: "11:00", label: "11:00 am" },
            { value: "14:00", label: "02:00 pm" },
            { value: "17:00", label: "05:00 pm" }
        ],
        5: [
            { value: "09:00", label: "09:00 am" },
            { value: "10:00", label: "10:00 am" },
            { value: "11:00", label: "11:00 am" },
            { value: "16:00", label: "04:00 pm" }
        ]
    },

    "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Eduardo": {
        2: [
            { value: "08:00", label: "08:00 am" },
            { value: "09:00", label: "09:00 am" },
            { value: "14:00", label: "02:00 pm" },
            { value: "15:00", label: "03:00 pm" }
        ],
        4: [
            { value: "10:00", label: "10:00 am" },
            { value: "11:00", label: "11:00 am" },
            { value: "16:00", label: "04:00 pm" },
            { value: "17:00", label: "05:00 pm" }
        ],
        6: [
            { value: "08:00", label: "08:00 am" },
            { value: "09:00", label: "09:00 am" },
            { value: "10:00", label: "10:00 am" }
        ]
    },

    "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Ney": {
        1: [
            { value: "09:00", label: "09:00 am" },
            { value: "10:00", label: "10:00 am" },
            { value: "11:00", label: "11:00 am" }
        ],
        3: [
            { value: "14:00", label: "02:00 pm" },
            { value: "15:00", label: "03:00 pm" },
            { value: "16:00", label: "04:00 pm" },
            { value: "17:00", label: "05:00 pm" }
        ],
        5: [
            { value: "08:00", label: "08:00 am" },
            { value: "09:00", label: "09:00 am" },
            { value: "15:00", label: "03:00 pm" }
        ]
    },

    "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Enrique": {
        2: [
            { value: "08:00", label: "08:00 am" },
            { value: "10:00", label: "10:00 am" },
            { value: "11:00", label: "11:00 am" },
            { value: "17:00", label: "05:00 pm" }
        ],
        4: [
            { value: "09:00", label: "09:00 am" },
            { value: "14:00", label: "02:00 pm" },
            { value: "15:00", label: "03:00 pm" }
        ],
        6: [
            { value: "09:00", label: "09:00 am" },
            { value: "10:00", label: "10:00 am" }
        ]
    },

    "<img src="/Clinica/img/emojis/doctor-avatar.png" width="20" height="20" alt="doctor" style="vertical-align:middle;"> Méd. Aaron": {
        1: [
            { value: "08:00", label: "08:00 am" },
            { value: "09:00", label: "09:00 am" },
            { value: "14:00", label: "02:00 pm" }
        ],
        3: [
            { value: "10:00", label: "10:00 am" },
            { value: "11:00", label: "11:00 am" },
            { value: "15:00", label: "03:00 pm" },
            { value: "16:00", label: "04:00 pm" }
        ],
        5: [
            { value: "08:00", label: "08:00 am" },
            { value: "09:00", label: "09:00 am" },
            { value: "10:00", label: "10:00 am" },
            { value: "17:00", label: "05:00 pm" }
        ]
    }
};

const NOMBRES_DIA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function actualizarHoras() {
    const doctorVal = doctorSelect.value;
    const fechaVal  = fechaInput.value;

    horaSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';

    if (!doctorVal || !fechaVal) return;

    const [anio, mes, dia] = fechaVal.split("-").map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    const diaSemana = fecha.getDay(); 

    const horarios = horariosPorMedico[doctorVal];

    if (!horarios || !horarios[diaSemana]) {
        const opt = document.createElement("option");
        opt.disabled = true;
        opt.textContent = `⚠️ ${NOMBRES_DIA[diaSemana]}: el médico no atiende este día`;
        horaSelect.appendChild(opt);
        return;
    }

    horarios[diaSemana].forEach(h => {
        const opt = document.createElement("option");
        opt.value = h.value;
        opt.textContent = h.label;
        horaSelect.appendChild(opt);
    });
}

especialidadSelect.addEventListener("change", function () {
    const especialidad = this.value;

    doctorSelect.innerHTML = '<option value="" disabled selected>Selecciona un Médico</option>';
    horaSelect.innerHTML   = '<option value="" disabled selected>Selecciona una hora</option>';

    if (doctores[especialidad]) {
        doctores[especialidad].forEach(doc => {
            const option = document.createElement("option");
            option.value = doc.value;
            option.textContent = doc.nombre;
            doctorSelect.appendChild(option);
        });
    }
});

doctorSelect.addEventListener("change", actualizarHoras);
fechaInput.addEventListener("change",   actualizarHoras);

fechaInput.addEventListener("input", function() {
    const doctorVal = doctorSelect.value;
    if (!doctorVal) return;

    const horarios = horariosPorMedico[doctorVal];
    if (!horarios) return;

    const diasDisponibles = Object.keys(horarios).map(Number);
    const [anio, mes, dia] = this.value.split("-").map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    const diaSemana = fecha.getDay();

    if (!diasDisponibles.includes(diaSemana)) {
        fechaInput.setCustomValidity(
            `El Dr. no atiende los ${NOMBRES_DIA[diaSemana]}. Días disponibles: ${diasDisponibles.map(d => NOMBRES_DIA[d]).join(", ")}`
        );
        fechaInput.reportValidity();
    } else {
        fechaInput.setCustomValidity("");
    }
});