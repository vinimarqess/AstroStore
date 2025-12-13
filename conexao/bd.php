<?php

$host = "astrostore_db";
$dbname = "astrostore"; // seu BD
$user = "astrostore_user";
$pass = "astrostore_pass";

// Conexão PDO
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} 
catch (PDOException $e) {
    die("Erro ao conectar ao banco: " . $e->getMessage());
}