<?php
$host     = "localhost";
$dbname   = "Clinica_JosePardo";
$user     = "postgres";
$password = "rodrigo20041998";

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}