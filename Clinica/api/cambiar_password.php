<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require "conexion.php";

$data     = json_decode(file_get_contents("php://input"), true);
$correo   = trim($data["correo"] ?? "");
$password = $data["password"] ?? "";

if (!$correo || !$password) {
    echo json_encode(["ok" => false, "msg" => "Datos incompletos."]);
    exit;
}

$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare("UPDATE pacientes SET password = ? WHERE correo = ?");
$stmt->execute([$hash, $correo]);

echo json_encode(["ok" => true]);