<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "conexion.php";

$correo = trim($_GET["correo"] ?? "");

$stmt = $pdo->prepare(
    "SELECT c.id, c.medico_nombre, c.especialidad,
            to_char(c.fecha, 'DD/MM/YYYY') AS fecha_legible,
            c.hora, c.motivo, c.estado,
            p.nombres, p.apellidos, p.dni, p.telefono
        FROM citas c
        JOIN pacientes p ON p.id = c.paciente_id
        WHERE p.correo = ?
        ORDER BY c.fecha DESC, c.hora DESC"
);
$stmt->execute([$correo]);
$citas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["ok" => true, "citas" => $citas]);