<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - Astro Store</title>
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
        <h2 class="auth-title">Criar Conta</h2>
        <form class="auth-form" action="../Controller/usuarioControle.php" method="POST">
            <input type="hidden" name="acao" value="registrar">
            <div class="form-group">
                <label for="reg-nome">Nome Completo</label>
                <input type="text" id="reg-nome" name="nome" placeholder="Seu nome" required>
            </div>
            <div class="form-group">
                <label for="reg-email">E-mail</label>
                <input type="email" id="reg-email" name="email" placeholder="seuemail@exemplo.com" required>
            </div>
            <div class="form-group">
                <label for="reg-senha">Senha</label>
                <input type="password" id="reg-senha" name="senha" placeholder="Crie uma senha forte" required>
            </div>
            <div class="form-group">
                <label for="reg-confirma-senha">Confirmar Senha</label>
                <input type="password" id="reg-confirma-senha" name="confirmar" placeholder="Repita a senha" required>
            </div>
            <div id="register-error-message" class="error-message">
                <?php if (isset($_GET['erro'])): ?>
                    <p style="color: red;"><?= htmlspecialchars($_GET['erro']) ?></p>
                <?php endif; ?>
            </div>
            <button class="auth-btn" type="submit">Registrar</button>
        </form>
        <p class="auth-switch">Já tem uma conta? <a href="Login.php">Faça login</a></p>
    </div>

    <footer>
        &copy; 2025 Astro Store. Todos os direitos reservados.
    </footer>
    <script src="pronpt.js"></script>
</body>
</html>