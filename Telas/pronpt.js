// Produtos por categoria
const produtos = {
    doces: [
        {
            nome: "Balinha Icekiss",
            desc: "Balas refrescantes Icekiss, perfeitas para adoçar seu dia!",
            preco: 2.50,
            img: "https://http2.mlstatic.com/D_NQ_NP_844675-MLA84177545292_052025-O.webp"
        }
    ]
};

function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produto) {
    let carrinho = getCarrinho();
    const idx = carrinho.findIndex(item => item.nome === produto.nome);
    if (idx > -1) {
        carrinho[idx].quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    salvarCarrinho(carrinho);
    alert('Produto adicionado ao carrinho!');
}

function mostrarProdutos(categoria) {
    const area = document.getElementById('products-area');
    if (!area) return;
    area.innerHTML = '';
    if (produtos[categoria]) {
        produtos[categoria].forEach((prod, idx) => {
            area.innerHTML += `
                <div class="item-card" data-categoria="${categoria}" data-idx="${idx}">
                    <img src="${prod.img}" alt="${prod.nome}">
                    <div class="item-info">
                        <span class="item-name">${prod.nome}</span>
                        <span class="item-desc">${prod.desc}</span>
                        <span class="item-price">R$ ${prod.preco.toFixed(2)}</span>
                        <button class="buy-btn" onclick="adicionarAoCarrinho(produtos['${categoria}'][${idx}]); event.stopPropagation();">Adicionar ao Carrinho</button>
                    </div>
                </div>
            `;
        });
        // Esconde as categorias e mostra os produtos
        const catList = document.getElementById('category-list');
        if (catList) catList.style.display = 'none';
        area.style.display = 'flex';

        // Evento para abrir modal (se usar)
        document.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.classList.contains('buy-btn')) return;
                const categoria = this.getAttribute('data-categoria');
                const idx = this.getAttribute('data-idx');
                abrirModalProduto(produtos[categoria][idx]);
            });
        });
    }
}

function abrirModalProduto(produto) {
    document.getElementById('modal-img').src = produto.img;
    document.getElementById('modal-nome').textContent = produto.nome;
    document.getElementById('modal-desc').textContent = produto.desc;
    document.getElementById('modal-preco').textContent = produto.preco;
    document.getElementById('modal-produto').style.display = 'flex';
}

function fecharModalProduto() {
    document.getElementById('modal-produto').style.display = 'none';
}

function renderCarrinho() {
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

document.addEventListener('DOMContentLoaded', function() {
    const categorias = document.querySelectorAll('.category-card');
    categorias.forEach(card => {
        card.addEventListener('click', function() {
            mostrarProdutos(this.dataset.category);
        });
    });

    // Fecha o modal ao clicar no X
    document.getElementById('close-modal').addEventListener('click', fecharModalProduto);

    // Fecha o modal ao clicar fora do conteúdo
    document.getElementById('modal-produto').addEventListener('click', function(e) {
        if (e.target === this) fecharModalProduto();
    });
});

