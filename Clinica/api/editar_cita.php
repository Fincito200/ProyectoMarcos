<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require "conexion.php";

$data   = json_decode(file_get_contents("php://input"), true);
$id     = (int)($data["id"] ?? 0);
$fecha  = $data["fecha"] ?? "";
$hora   = $data["hora"] ?? "";
$motivo = $data["motivo"] ?? "";

if (!$id || !$fecha || !$hora || !$motivo) {
    echo json_encode(["ok" => false, "msg" => "Datos incompletos."]);
    exit;
}

$stmt = $pdo->prepare("UPDATE citas SET fecha = ?, hora = ?, motivo = ? WHERE id = ?");
$stmt->execute([$fecha, $hora, $motivo, $id]);

echo json_encode(["ok" => true]);