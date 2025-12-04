<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Astro Store</title>
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="login-registro-bg">
    <header class="header">
        <a href="TelaInicial.php" class="astro-title-link">
            <span class="astro-title">ASTRO STORE</span>
        </a>
        <a href="perfil.php" id="perfil-link" title="Perfil" class="perfil-icon">👤</a>
    </header>
    <nav>
        <a href="TelaInicial.php">Início</a>
        <a href="catalogo.php">Catálogo</a>
        <a href="carrinho.php">Carrinho</a>
    </nav>

    <div class="auth-container">
        <h2 class="auth-title">Fazer Login</h2>
        <form class="auth-form" id="loginFormPage" method="POST" action="../Controller/usuarioControle.php">
            <input type="hidden" name="acao" value="login">
            <div class="form-group">
                <label for="login-email">E-mail</label>
                <input type="email" id="login-email" name="email" placeholder="seuemail@exemplo.com" required>
            </div>
            <div class="form-group">
                <label for="login-senha">Senha</label>
                <input type="password" id="login-senha" name="senha" placeholder="Sua senha" required>
            </div>
            <div id="login-error-message" class="error-message"></div>
            <button class="auth-btn" type="submit">Entrar</button>
        </form>
        <p class="auth-switch">Não tem uma conta? <a href="Registro.php">Registre-se aqui</a></p>
    </div>

    <footer>
        &copy; 2025 Astro Store. Todos os direitos reservados.
    </footer>

    <script>
        const usuarioLogado = <?= json_encode($_SESSION['usuario'] ?? false); ?>;
    </script>
    <script src="prompt.js"></script>
</body>
</html>