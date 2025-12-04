<?php
require_once dirname(__DIR__) . '/conexao/bd.php';

class Usuario {

    public static function registrar($nome, $email, $senha) {
        global $conn;

        // senha  hash
        $hash = password_hash($senha, PASSWORD_BCRYPT);

        // Verifica se email ja existe
        $check = $conn->prepare("SELECT id_usuario  FROM usuario WHERE email = :email");
        $check->bindValue(':email', $email);
        $check->execute();

        if ($check->rowCount() > 0) {
            return "E-mail já cadastrado.";
        }

        // Insere novo usuário
        $sql = $conn->prepare("
            INSERT INTO usuario (nome, email, senha)
            VALUES (:nome, :email, :senha)
        ");

        $sql->bindValue(':nome', $nome);
        $sql->bindValue(':email', $email);
        $sql->bindValue(':senha', $hash);

        if ($sql->execute()) {
            return $conn->lastInsertId(); 
        } else {
            return "Erro ao criar usuario.";
        }   
    }

    public static function login($email, $senha) {
        global $conn; // conexao PDO
        $stmt = $conn->prepare("SELECT * FROM usuario WHERE email = :email LIMIT 1");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_OBJ);

        if ($usuario && password_verify($senha, $usuario->senha)) {
            return $usuario;
        } else {
            return false;
        }
    }

    public static function editar($id, $nome, $senha = null) {
        global $conn;

        // Se for alterar senha
        if ($senha !== null && $senha !== "") {
            $hash = password_hash($senha, PASSWORD_BCRYPT);
            $sql = $conn->prepare("
                UPDATE usuario 
                SET nome = :nome, senha = :senha 
                WHERE id_usuario = :id
            ");
            $sql->bindValue(":senha", $hash);
        } 
        // Se NÃO for alterar senha
        else {
            $sql = $conn->prepare("
                UPDATE usuario 
                SET nome = :nome 
                WHERE id_usuario = :id
            ");
        }

        $sql->bindValue(":nome", $nome);
        $sql->bindValue(":id", $id);

        return $sql->execute();
    }

    public static function excluir($id) {
        global $conn;

        $sql = $conn->prepare("DELETE FROM usuario WHERE id_usuario = :id");
        $sql->bindValue(':id', $id);

        return $sql->execute();
    }

}
?>