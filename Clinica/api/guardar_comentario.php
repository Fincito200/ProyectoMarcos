<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require "conexion.php";

$data       = json_decode(file_get_contents("php://input"), true);
$id         = (int)($data["id"] ?? 0);
$comentario = trim($data["comentario"] ?? "");

if (!$id) {
    echo json_encode(["ok" => false, "msg" => "ID inválido."]);
    exit;
}

$stmt = $pdo->prepare("UPDATE citas SET comentario = ? WHERE id = ?");
$stmt->execute([$comentario, $id]);

echo json_encode(["ok" => true]);