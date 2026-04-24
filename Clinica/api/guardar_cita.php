<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$correo_paciente = trim($data["correo"] ?? "");
$medico_nombre   = $data["doctor"] ?? "";
$especialidad    = $data["especialidad"] ?? "";
$fecha           = $data["fecha"] ?? ""; // formato YYYY-MM-DD
$hora            = $data["hora"] ?? "";
$motivo          = $data["motivo"] ?? "";

// Buscar id del paciente
$stmt = $pdo->prepare("SELECT id FROM pacientes WHERE correo = ?");
$stmt->execute([$correo_paciente]);
$paciente = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$paciente) {
    echo json_encode(["ok" => false, "msg" => "Paciente no encontrado."]);
    exit;
}

$stmt = $pdo->prepare(
    "INSERT INTO citas (paciente_id, medico_nombre, especialidad, fecha, hora, motivo, estado)
        VALUES (?, ?, ?, ?, ?, ?, 'pendiente')"
);
$stmt->execute([
    $paciente["id"], $medico_nombre, $especialidad, $fecha, $hora, $motivo
]);

echo json_encode(["ok" => true, "msg" => "Cita guardada correctamente."]);