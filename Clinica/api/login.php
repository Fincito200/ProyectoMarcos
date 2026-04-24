<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require "conexion.php";

$data     = json_decode(file_get_contents("php://input"), true);
$correo   = trim($data["correo"] ?? "");
$password = $data["password"] ?? "";
$tipo     = $data["tipo"] ?? "paciente"; // "paciente" o "doctor"

if ($tipo === "doctor") {
    $stmt = $pdo->prepare("SELECT id, nombre, password, especialidad FROM medicos WHERE correo = ?");
    $stmt->execute([$correo]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        echo json_encode([
            "ok"     => true,
            "tipo"   => "doctor",
            "nombre" => $user["nombre"],
            "correo" => $correo
        ]);
    } else {
        echo json_encode(["ok" => false, "msg" => "Correo o contraseña incorrectos."]);
    }

} else {
    $stmt = $pdo->prepare("SELECT id, nombres, password FROM pacientes WHERE correo = ?");
    $stmt->execute([$correo]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        echo json_encode([
            "ok"     => true,
            "tipo"   => "paciente",
            "nombre" => $user["nombres"],
            "correo" => $correo
        ]);
    } else {
        echo json_encode(["ok" => false, "msg" => "Correo o contraseña incorrectos."]);
    }
}