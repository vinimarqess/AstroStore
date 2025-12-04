<?php 
session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Location: Login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil - Astro Store</title>
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:700,400&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <span class="astro-title">ASTRO STORE</span>
        <form class="search-bar" action="#" method="get">
            <input type="text" placeholder="Buscar produtos..." name="q">
            <button type="submit">🔍</button>
        </form>
            <a href="perfil.php" id="perfil-link" title="Perfil" class="perfil-icon">
            👤
        </a>
    </header>
    <nav>
        <a href="TelaInicial.php">Início</a>
        <a href="catalogo.php">Catálogo</a>
        <a href="carrinho.php">Carrinho</a>
    </nav>

    <!-- EDITAR LOGIN -->
    <div class="auth-container">
        <h2 class="auth-title">Editar Perfil</h2>
            <form action="../Controller/usuarioControle.php" method="POST" class="perfil-form">
                <input type="hidden" name="acao" value="editar">  

                    <div class="form-group">
                        <label>Nome:</label>
                        <input type="text" name="nome" 
                        value="<?php echo $_SESSION['usuario_nome']; ?>" required>
                    </div>

                    <div class="form-group">    
                        <label>Email:</label>
                        <input type="email" name="email"
                            value="<?php echo $_SESSION['usuario_email']; ?>" required>
                    </div>
                    <div class="form-group">
                        <label>Senha (opcional):</label>
                        <input type="password" name="senha" placeholder="Digite para alterar">
                    </div>

                <button type="submit" class="perfil-btn">Salvar Alterações</button>        
            </form>
            
            <form action="../Controller/usuarioControle.php" method="POST">
                <input type="hidden" name="acao" value="excluir">
                <button type="submit" class="perfil-btn excluir-btn" onclick="return confirm('Tem certeza que deseja excluir sua conta?')">
                    Excluir Conta
                </button>
            </form>
    </div>
    <footer>
        &copy; 2025 Astro Store. Todos os direitos reservados.
    </footer>

    <!-- MODAL DE AVISO LOGIN -->
    <div id="modal-aviso" class="modal-avisoClass" style="display: none;">
        <div class="modal-aviso-box">
            <span id="modal-aviso-text"></span>

            <button id="modal-avisobtn">OK</button>
        </div>
    </div>
    
    <script>
        const usuarioLogado = <?= $_SESSION['usuario_id']; ?>;
        const usuarioNome = <?= json_encode($_SESSION['usuario_nome']); ?>;
        const usuarioEmail = <?= json_encode($_SESSION['usuario_email']); ?>;
    </script>
    
    <script src="prompt.js"></script>
</body>
</html>
