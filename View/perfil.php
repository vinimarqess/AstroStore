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

    <!-- Perfil -->
    <div class="auth-container">
        <h2 class="auth-title">Bem-vindo, <?php echo $_SESSION['usuario_nome']; ?>!</h2>
            
        <div class="auth-form">
                <button class="perfil-btn" onclick="window.location.href='EditarPerfil.php'">Configurações de Conta</button>
                <button class="perfil-btn" onclick="mostrarPagamentos()">Métodos de Pagamento</button>
                <button class="perfil-btn" onclick="mostrarHistorico()">Histórico</button>
                <button class="perfil-btn" onclick="mostrarContato()">Contato com a Loja</button>

                <!-- AQUI aparece a tabela quando clicar em Configurações -->
                <div id="perfil-form-area"></div>
                
                <button class="perfil-btn" onclick="window.location.href='index.php'">Usuários</button>
                <button class="perfil-btn" onclick="window.location.href='../Controller/logout.php'">Sair</button>

        </div>

    </div>
                

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
