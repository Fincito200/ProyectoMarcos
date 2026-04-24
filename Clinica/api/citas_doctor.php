<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "conexion.php";

$nombre_doctor = trim($_GET["nombre"] ?? "");

$stmt = $pdo->prepare(
    "SELECT c.id, c.especialidad, c.estado,
            to_char(c.fecha, 'DD/MM/YYYY') AS fecha_legible,
            c.hora, c.motivo,
            p.nombres, p.apellidos, p.dni, p.telefono, p.correo
        FROM citas c
        JOIN pacientes p ON p.id = c.paciente_id
        WHERE c.medico_nombre = ?
        ORDER BY c.fecha ASC, c.hora ASC"
);
$stmt->execute([$nombre_doctor]);
$citas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["ok" => true, "citas" => $citas]);