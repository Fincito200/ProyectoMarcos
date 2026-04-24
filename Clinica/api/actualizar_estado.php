<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require "conexion.php";

$data   = json_decode(file_get_contents("php://input"), true);
$id     = (int)($data["id"] ?? 0);
$estado = $data["estado"] ?? "";

$permitidos = ["pendiente", "confirmada", "atendida"];
if (!$id || !in_array($estado, $permitidos)) {
    echo json_encode(["ok" => false, "msg" => "Datos inválidos."]);
    exit;
}

$stmt = $pdo->prepare("UPDATE citas SET estado = ? WHERE id = ?");
$stmt->execute([$estado, $id]);

echo json_encode(["ok" => true]);