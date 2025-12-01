<?php
require_once "../Model/usuario.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'registrar') {

    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $senha = $_POST['senha'];
    $confirmar = $_POST['confirmar'];

    if ($nome === '' || $email === '' || $senha === '') {
        header("Location: ../View/Registro.php?erro=" . urlencode("Preencha todos os campos"));
        exit;
    }

    // Senhas diferentes
    if ($senha !== $confirmar) {
        header("Location: ../View/Registro.php?erro=" . urlencode("As senhas não coincidem"));
        exit;
    }

    
    // Chama o Model
    $resultado = Usuario::registrar($nome, $email, $senha);

    if (is_numeric($resultado)) {
        header("Location: ../View/Login.php?msg=" . urlencode("Sua conta foi criada! Faça login."));
        exit;
    } else {
        header("Location: ../View/Registro.php?erro=" . urlencode($resultado));
        exit;
    }
}

// LOGIN
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'login') {

    $email = trim($_POST['email']);
    $senha = $_POST['senha'];

    if ($email === '' || $senha === '') {
        header("Location: ../View/Login.php?msg=" . urlencode("Preencha todos os campos"));
        exit;
    }

    $usuario = Usuario::login($email, $senha);

    if ($usuario) {
        session_start();
        $_SESSION['user_id'] = $usuario->id;
        $_SESSION['user_name'] = $usuario->name;

        header("Location: ../View/TelaInicial.php");
        exit;
    } else {
        header("Location: ../View/Login.php?msg=" . urlencode("E-mail ou senha inválidos"));
        exit;
    }
}


?>