<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require "conexion.php";

$data   = json_decode(file_get_contents("php://input"), true);
$correo = trim($data["correo"] ?? "");

$stmt = $pdo->prepare("SELECT id FROM pacientes WHERE correo = ?");
$stmt->execute([$correo]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode(["ok" => $user ? true : false]);