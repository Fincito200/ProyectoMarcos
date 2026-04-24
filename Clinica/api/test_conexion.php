<?php
$host     = "localhost";
$dbname   = "Clinica_JosePardo";
$user     = "postgres";
$password = "rodrigo20041998";  // <- pon tu contraseña real aquí

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    echo "✅ Conexión exitosa a PostgreSQL";
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}