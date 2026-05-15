-- Script de base de datos para Clinica_JosePardo (PostgreSQL)
-- Ejecutar manualmente en pgAdmin o psql antes de iniciar Spring Boot

CREATE TABLE IF NOT EXISTS pacientes (
    id         SERIAL PRIMARY KEY,
    nombres    CHARACTER VARYING(100) NOT NULL,
    apellidos  CHARACTER VARYING(100) NOT NULL,
    dni        CHARACTER VARYING(8)   NOT NULL,
    telefono   CHARACTER VARYING(12)  NOT NULL,
    correo     CHARACTER VARYING(150) NOT NULL UNIQUE,
    password   CHARACTER VARYING(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medicos (
    id           SERIAL PRIMARY KEY,
    nombre       CHARACTER VARYING(100) NOT NULL,
    correo       CHARACTER VARYING(150) NOT NULL UNIQUE,
    password     CHARACTER VARYING(255) NOT NULL,
    especialidad CHARACTER VARYING(150) NOT NULL,
    created_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS citas (
    id             SERIAL PRIMARY KEY,
    paciente_id    INTEGER NOT NULL REFERENCES pacientes(id),
    medico_nombre  CHARACTER VARYING(100),
    especialidad   CHARACTER VARYING(100),
    fecha          DATE,
    hora           TIME WITHOUT TIME ZONE,
    motivo         TEXT,
    estado         CHARACTER VARYING(20) DEFAULT 'pendiente',
    comentario     TEXT DEFAULT '',
    created_at     TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Datos iniciales de médicos (contraseña: doctor123)
INSERT INTO medicos (nombre, correo, password, especialidad) VALUES
('Méd. Joseph',  'joseph@clinica.com',  '$2a$10$R7dRn0A80Dap.vZCdQXlaun1JprS8H.PJDz/B0xJrpVBrSIhOs.1.', 'Medicina General'),
('Méd. Eduardo', 'eduardo@clinica.com', '$2a$10$R7dRn0A80Dap.vZCdQXlaun1JprS8H.PJDz/B0xJrpVBrSIhOs.1.', 'Oftalmología'),
('Méd. Ney',     'ney@clinica.com',     '$2a$10$R7dRn0A80Dap.vZCdQXlaun1JprS8H.PJDz/B0xJrpVBrSIhOs.1.', 'Cardiología'),
('Méd. Enrique', 'enrique@clinica.com', '$2a$10$R7dRn0A80Dap.vZCdQXlaun1JprS8H.PJDz/B0xJrpVBrSIhOs.1.', 'Pediatría'),
('Méd. Aaron',   'aaron@clinica.com',   '$2a$10$R7dRn0A80Dap.vZCdQXlaun1JprS8H.PJDz/B0xJrpVBrSIhOs.1.', 'Ginecología')
ON CONFLICT (correo) DO NOTHING;