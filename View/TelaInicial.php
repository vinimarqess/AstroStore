<?php session_start(); ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Astro Store - Início</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body style="min-height:100vh;display:flex;flex-direction:column;">
    <header class="header">
        <a href="TelaInicial.php" class="astro-title-link">
            <span class="astro-title">ASTRO STORE</span>
        </a>
        <form class="search-bar" onsubmit="realizarPesquisa(event)">
            <input type="text" id="search-input" placeholder="Buscar produtos..." name="q">
            <button type="submit">🔍</button>
        </form>
        <a href="perfil.php" title="Perfil" class="perfil-icon">👤</a>
    </header>

    <nav>
        <a href="TelaInicial.php">Início</a>
        <a href="catalogo.php">Catálogo</a>
        <a href="carrinho.php">Carrinho</a>
    </nav>

    <h1 class="destaques-titulo">Destaques do Mês</h1>
    <section class="destaques">
        <div class="carrossel">
            <button class="prev">❮</button>
            <div class="carrossel-container">
                <div class="carrossel-track">
                    <?php
                    $produtos = [
                        ["img" => "https://http2.mlstatic.com/D_NQ_NP_844675-MLA84177545292_052025-O.webp", "nome" => "Balinha Icekiss", "preco" => "R$ 2,50"],
                        ["img" => "https://phygital-files.mercafacil.com/gui-box/uploads/produto/bala_peccin_menta_un_09f53a4e-30cf-40e9-8f9a-e37632d266ca.jpeg", "nome" => "Bala de Menta", "preco" => "R$ 1,50"],
                        ["img" => "https://s3-sa-east-1.amazonaws.com/files-sc.sigecloud.com.br/Producao/50e8404b-5819-4e08-8968-077f4f55d43e/ImagensProdutos/64b54d731409256b3728d79d_600x600.jpeg", "nome" => "Balinha Chita", "preco" => "R$ 1,80"],
                    ];
                    foreach ($produtos as $idx => $p) {
                        echo '<div class="carrossel-item" onclick="mostrarProdutoCarrossel('.$idx.')">';
                        echo '<img src="'.$p["img"].'" alt="'.$p["nome"].'">';
                        echo '<h3>'.$p["nome"].'</h3>';
                        echo '<p>'.$p["preco"].'</p>';
                        echo '</div>';
                    }
                    ?>
                </div>
            </div>
            <button class="next">❯</button>
        </div>
    </section>

    <main class="grade">
        <h1 class="grade-title">Bem-vindo à Astro Store!</h1>
        <section style="margin-top:40px;display:flex;gap:40px;flex-wrap:wrap;justify-content:center;">
            <?php
            for ($i = 0; $i < 8; $i++) {
                $p = $produtos[$i % count($produtos)];
                echo '<div class="bloco_produto">';
                echo '<img class="imagem_item" src="'.$p["img"].'" alt="'.$p["nome"].'">';
                echo '<button class="buy-btn" onclick="adicionarAoCarrinho('.$i.')">Comprar</button>';
                echo '</div>';
            }
            ?>
        </section>
    </main>
    <section class="rodape">
        <h2 style="color:#00bfff;font-size:2.2rem;margin-bottom:20px;text-align:center;">Por que escolher a Astro Store?</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px;max-width:1200px;width:100%;">
            <?php
            $beneficios = [
                ["titulo" => "Inovação", "desc" => "Sempre na vanguarda da tecnologia com os produtos mais modernos do mercado."],
                ["titulo" => "Sustentabilidade", "desc" => "Comprometidos com o meio ambiente e práticas sustentáveis."],
                ["titulo" => "Qualidade", "desc" => "Produtos testados e aprovados pela nossa equipe de especialistas."],
            ];
            foreach ($beneficios as $b) {
                echo '<div style="background:rgba(24,24,72,0.8);padding:30px;border-radius:15px;text-align:center;">';
                echo '<h3 style="color:#00bfff;margin-bottom:15px;">'.$b["titulo"].'</h3>';
                echo '<p style="color:#fff;opacity:0.9;">'.$b["desc"].'</p>';
                echo '</div>';
            }
            ?>
        </div>
    </section>

    <section style="min-height:50vh;padding:40px;display:flex;justify-content:center;align-items:center;">
        <div style="text-align:center;max-width:600px;">
            <h2 style="color:#00bfff;margin-bottom:20px;">Pronto para começar?</h2>
            <p style="color:#fff;opacity:0.9;font-size:1.1rem;margin-bottom:30px;">Explore nosso catálogo completo e descubra produtos incríveis que vão transformar sua experiência de compra.</p>
            <a href="catalogo.php" style="display:inline-block;background:linear-gradient(90deg,#00bfff,#6a5acd);color:#fff;padding:15px 30px;border-radius:25px;text-decoration:none;font-weight:bold;transition:transform 0.3s;">Ver Catálogo Completo</a>
        </div>
    </section>

    <footer style="background:rgba(24,24,72,0.95);color:#fff;text-align:center;padding:15px 0;border-top:2px solid #00bfff;box-shadow:0 -2px 10px rgba(0,191,255,0.2);margin-top:auto;">
        &copy; 2025 Astro Store. Todos os direitos reservados.
    </footer>

    <div id="modal-pesquisa" class="modal-produto" style="display:none;">
        <div class="modal-content" style="max-width:600px;width:90vw;">
            <span class="close-modal" onclick="fecharModalPesquisa()">&times;</span>
            <h2 style="color:#00bfff;margin-bottom:20px;">Resultados da Pesquisa</h2>
            <div id="resultados-pesquisa"></div>
        </div>
    </div>

    <div id="modal-produto-carrossel" class="modal-produto" style="display:none;">
        <div class="modal-content">
            <span class="close-modal" onclick="fecharModalCarrossel()">&times;</span>
            <img id="modal-img-carrossel" class="modal-img" src="" alt="">
            <h2 id="modal-nome-carrossel"></h2>
            <p id="modal-desc-carrossel"></p>
            <p id="modal-preco-carrossel" style="font-size:1.3rem;font-weight:bold;color:#00bfff;"></p>
            <button class="buy-btn" id="modal-buy-btn-carrossel">Adicionar ao Carrinho</button>
        </div>
    </div>

    <script src="prompt.js"></script>
</body>
</html>
