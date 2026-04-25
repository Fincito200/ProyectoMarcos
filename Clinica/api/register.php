<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$nombres   = trim($data["nombres"] ?? "");
$apellidos = trim($data["apellidos"] ?? "");
$dni       = trim($data["dni"] ?? "");
$telefono  = trim($data["telefono"] ?? "");
$correo    = trim($data["correo"] ?? "");
$password  = $data["password"] ?? "";

if (!$nombres || !$apellidos || !$dni || !$telefono || !$correo || !$password) {
    echo json_encode(["ok" => false, "msg" => "Completa todos los campos."]);
    exit;
}

// VERIFICA SI EL CORREO EXISTE
$check = $pdo->prepare("SELECT id FROM pacientes WHERE correo = ?");
$check->execute([$correo]);
if ($check->fetch()) {
    echo json_encode(["ok" => false, "msg" => "Ya existe una cuenta con ese correo."]);
    exit;
}

$hash = password_hash($password, PASSWORD_BCRYPT);

$stmt = $pdo->prepare(
    "INSERT INTO pacientes (nombres, apellidos, dni, telefono, correo, password)
        VALUES (?, ?, ?, ?, ?, ?)"
);
$stmt->execute([$nombres, $apellidos, $dni, $telefono, $correo, $hash]);

echo json_encode([
    "ok"      => true,
    "nombres" => $nombres,
    "correo"  => $correo
]);