<?php
session_start();
require_once "../Model/usuario.php";

// REGISTRAR
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['acao'] === 'registrar') {

    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $senha = $_POST['senha'];
    $confirmar = $_POST['confirmar'];

    if ($nome === '' || $email === '' || $senha === '') {
        header("Location: ../View/Registro.php?erro=" . urlencode("Preencha todos os campos"));
        exit;
    }

    if ($senha !== $confirmar) {
        header("Location: ../View/Registro.php?erro=" . urlencode("As senhas não coincidem"));
        exit;
    }

    $resultado = Usuario::registrar($nome, $email, $senha);

    if (is_numeric($resultado)) {
        header("Location: ../View/Login.php?msg=" . urlencode("Conta criada com sucesso!"));
        exit;
    } else {
        header("Location: ../View/Registro.php?erro=" . urlencode($resultado));
        exit;
    }
}



//  LOGIN 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['acao'] === 'login') {

    $email = trim($_POST['email']);
    $senha = trim($_POST['senha']);

    $usuario = Usuario::login($email, $senha);

    if ($usuario) {

        $_SESSION['usuario_id'] = $usuario->id_usuario;
        $_SESSION['usuario_nome'] = $usuario->nome;
        $_SESSION['usuario_email'] = $usuario->email;

        header("Location: ../View/TelaInicial.php");
        exit;

    } else {
        header("Location: ../View/Login.php?erro=" . urlencode("Usuário ou senha inválidos"));
        exit;
    }
}



//  EDITAR 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['acao'] === 'editar') {

    if (!isset($_SESSION['usuario_id'])) {
        header("Location: ../View/Login.php");
        exit;
    }

    $id = $_SESSION['usuario_id'];
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $senha = trim($_POST['senha']);

    $ok = Usuario::editar($id, $nome, $email, $senha);

    if ($ok) {
        $_SESSION['usuario_nome'] = $nome;
        $_SESSION['usuario_email'] = $email;

        header("Location: ../View/perfil.php?msg=salvo");
        exit;
    } else {
        header("Location: ../View/EditarPerfil.php?erro=Erro ao atualizar");
        exit;
    }
}



// EXCLUIR 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['acao'] === 'excluir') {

    if (!isset($_SESSION['usuario_id'])) {
        die("Erro: usuário não logado.");
    }

    $id = $_SESSION['usuario_id'];

    if (Usuario::excluir($id)) {

        session_unset();
        session_destroy();

        header("Location: ../View/Login.php?msg=conta_excluida");
        exit;

    } else {
        die("Erro ao excluir a conta.");
    }
}

?>
