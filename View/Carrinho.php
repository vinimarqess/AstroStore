<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrinho - Astro Store</title>
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:700,400&display=swap" rel="stylesheet">
</head>
<body class="carrinho-bg" style="min-height: 100vh; display: flex; flex-direction: column;">
    <header class="header">
        <a href="TelaInicial.php" class="astro-title-link">
            <span class="astro-title">ASTRO STORE</span>
        </a>
        <form class="search-bar" onsubmit="realizarPesquisa(event)">
            <input type="text" id="search-input" placeholder="Buscar produtos..." name="q">
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
            <!-- O nome de usuário será inserido via JS -->
    </nav>
    <div class="cart-container" style="flex: 1;">
        <div class="cart-title">Seu Carrinho</div>
        <div class="cart-items" id="cart-items">
            <!-- Produtos do carrinho aparecem aqui -->
        </div>
        <div class="cart-summary" id="cart-summary">
            <!-- Resumo do carrinho -->
        </div>
        <div id="empty-cart-box" style="display:none; margin-top:20px;">
            <div>
                <p>Seu carrinho está vazio.</p>
                <a href="catalogo.php" class="buy-btn" style="text-decoration:none;">Ir para o Catálogo</a>
            </div>
        </div>
        <button class="checkout-btn" id="checkout-btn" onclick="window.location.href='pagamento.php'">Ir para Pagamento</button>
    </div>
    <footer style="position: static !important; width: 100%; background: rgba(24,24,72,0.95); color: #fff; text-align: center; padding: 15px 0; border-top: 2px solid #00bfff; box-shadow: 0 -2px 10px rgba(0, 191, 255, 0.2); margin-top: auto !important;">
        &copy; 2025 Astro Store. Todos os direitos reservados.
    </footer>
    <script src="pronpt.js"></script>
    <script>
        function getCarrinho() {
            return JSON.parse(localStorage.getItem('carrinho')) || [];
        }

        function salvarCarrinho(carrinho) {
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }

        function renderCarrinho() {
            let carrinho = getCarrinho();
            const cartItems = document.getElementById('cart-items');
            const cartSummary = document.getElementById('cart-summary');
            const emptyBox = document.getElementById('empty-cart-box');
            const checkoutBtn = document.getElementById('checkout-btn');
            cartItems.innerHTML = '';
            let total = 0;
            if (carrinho.length === 0) {
                cartItems.classList.add('empty');
                cartSummary.innerHTML = '';
                emptyBox.style.display = 'block';
                if (checkoutBtn) checkoutBtn.style.display = 'none';
                return;
            }
            cartItems.classList.remove('empty');
            emptyBox.style.display = 'none';
            if (checkoutBtn) checkoutBtn.style.display = 'inline-block';
            carrinho.forEach((item, idx) => {
                total += item.preco * item.quantidade;
                cartItems.innerHTML += `
                    <div class="cart-item">
                        <div class="item-info">
                            <img class="item-img" src="${item.img}" alt="${item.nome}">
                            <span class="item-name">${item.nome}</span>
                            <div class="qty-controls">
                                <button class="qty-btn" onclick="alterarQuantidade(${idx}, -1)">-</button>
                                <span class="item-qty">${item.quantidade}</span>
                                <button class="qty-btn" onclick="alterarQuantidade(${idx}, 1)">+</button>
                            </div>
                        </div>
                        <div>
                            <span class="item-price">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                            <button class="remove-btn" onclick="removerItem(${idx})">Remover</button>
                        </div>
                    </div>
                `;
            });
            cartSummary.innerHTML = `Total: <strong>R$ ${total.toFixed(2)}</strong>`;
        }

        function removerItem(idx) {
            let carrinho = getCarrinho();
            carrinho.splice(idx, 1);
            salvarCarrinho(carrinho);
            renderCarrinho();
        }

        function alterarQuantidade(idx, delta) {
            let carrinho = getCarrinho();
            carrinho[idx].quantidade += delta;
            if (carrinho[idx].quantidade < 1) {
                carrinho[idx].quantidade = 1;
            }
            salvarCarrinho(carrinho);
            renderCarrinho();
        }

        document.addEventListener('DOMContentLoaded', renderCarrinho);

        // Funções para pesquisa
        function realizarPesquisa(event) {
            event.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            if (!query) return;
            const resultados = buscarProdutos(query);
            exibirResultadosPesquisa(resultados);
        }

        function buscarProdutos(query) {
            let carrinho = getCarrinho();
            return carrinho.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
        }

        function exibirResultadosPesquisa(resultados) {
            const modal = document.getElementById('modal-pesquisa');
            const conteudo = document.getElementById('resultados-pesquisa');
            conteudo.innerHTML = '';
            if (resultados.length === 0) {
                conteudo.innerHTML = '<p>Nenhum produto encontrado.</p>';
            } else {
                resultados.forEach(item => {
                    conteudo.innerHTML += `
                        <div class="resultado-item">
                            <img src="${item.img}" alt="${item.nome}" class="resultado-img">
                            <div class="resultado-info">
                                <span class="resultado-nome">${item.nome}</span>
                                <span class="resultado-preco">R$ ${item.preco.toFixed(2)}</span>
                            </div>
                        </div>
                    `;
                });
            }
            modal.style.display = 'block';
        }

        function fecharModalPesquisa() {
            const modal = document.getElementById('modal-pesquisa');
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            const modal = document.getElementById('modal-pesquisa');
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    </script>
</body>
</html>