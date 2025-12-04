<?php
require_once __DIR__ . '/../conexao/bd.php';

$sql = $conn->query("SELECT * FROM usuario");
$usuarios = $sql->fetchAll(PDO::FETCH_OBJ);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuários cadastrados</title>
</head>
<body>
    <h1>Usuários cadastrados</h1>
    <a href="cadastro.php">Cadastrar usuário</a>

    <table border="1" cellpadding="5" cellspacing="0">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Editar</th>
            <th>Excluir</th>
        </tr>
        <?php foreach($usuarios as $usuario): ?>
        <tr>
            <td><?= $usuario->id_usuario ?></td>
            <td><?= $usuario->nome ?></td>
            <td><?= $usuario->email ?></td>
            <td><a href="EditarPerfil.php?id=<?= $usuario->id_usuario ?>">editar</a></td>
            <td><a href="excluir.php?id=<?= $usuario->id_usuario ?>">excluir</a></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>