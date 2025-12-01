<?php

$host = "localhost";
$dbname = "astro"; // seu BD
$user = "root";
$pass = "";

// Conexão PDO
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} 
catch (PDOException $e) {
    die("Erro ao conectar ao banco: " . $e->getMessage());
}