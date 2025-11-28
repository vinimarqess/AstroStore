<?php
require_once 'banco/bd.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $confirma_senha = $_POST['confirma_senha'] ?? '';


    
// VERIFICAÇ~IOES
if (empty($nome) || empty($email) || empty($senha) || empty($confirma_senha)) {
    die("Erro: Todos os campos são obrigatórios.");
}

// VERIFICAR EMAI
$check_email = mysqli_query($conn, "SELECT id FROM usuarios WHERE email = '$email_seguro'");
if (mysqli_num_rows($check_email) > 0) {
    die("Erro: Este email ja está cadastrado.");
}
    
// Senha
if ($senha !== $confirma_senha) {
    die("Erro: As senhas não coincidem.");
}
$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

//INSERIR DADOS
$nome_seguro = mysqli_real_escape_string($conn, $nome);
$email_seguro = mysqli_real_escape_string($conn, $email);
    
$sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome_seguro', '$email_seguro', '$senha_hash')";





if (mysqli_query($conn, $sql)) {
    header("Location: Login.html?status=success");
    exit();
} else {
    echo "Erro ao registrar: " . mysqli_error($conn);
}

} else {

    header("Location: Registro.html");
    exit();
}
mysqli_close($conn);
?>