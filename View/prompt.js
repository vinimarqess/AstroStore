// VERSÃO FINAL COM PERFIL COMPLETO - 02/10/2025

// ================= DADOS DOS PRODUTOS =================
const produtos = {
    doces: [
        {
            nome: "Balinha Icekiss",
            desc: "Balas refrescantes Icekiss, perfeitas para adoçar seu dia!",
            preco: 2.50,
            img: "https://http2.mlstatic.com/D_NQ_NP_844675-MLA84177545292_052025-O.webp"
        },
        {
            nome: "Bala de Menta Peccin",
            desc: "Bala refrescante de menta, ideal para refrescar o hálito!",
            preco: 1.50,
            img: "https://phygital-files.mercafacil.com/gui-box/uploads/produto/bala_peccin_menta_un_09f53a4e-30cf-40e9-8f9a-e37632d266ca.jpeg"
        },
        {
            nome: "Balinha Chita",
            desc: "Deliciosa balinha mastigável com sabor único e irresistível!",
            preco: 1.80,
            img: "https://s3-sa-east-1.amazonaws.com/files-sc.sigecloud.com.br/Producao/50e8404b-5819-4e08-8968-077f4f55d43e/ImagensProdutos/64b54d731409256b3728d79d_600x600.jpeg"
        }
    ]
};

// ================= FUNÇÕES BÁSICAS =================
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

// ================= MODAL DO CARROSSEL =================
function mostrarProdutoCarrossel(index) {
    const produtosDaLista = produtos.doces;
    if (produtosDaLista && produtosDaLista[index]) {
        const produto = produtosDaLista[index];
        
        document.getElementById('modal-img-carrossel').src = produto.img;
        document.getElementById('modal-nome-carrossel').textContent = produto.nome;
        document.getElementById('modal-desc-carrossel').textContent = produto.desc;
        document.getElementById('modal-preco-carrossel').textContent = `R$ ${produto.preco.toFixed(2)}`;
        
        const modalBuyBtn = document.getElementById('modal-buy-btn-carrossel');
        modalBuyBtn.onclick = function() {
            adicionarAoCarrinho(produto);
            fecharModalCarrossel();
        };
        
        document.getElementById('modal-produto-carrossel').style.display = 'flex';
    }
}

function fecharModalCarrossel() {
    document.getElementById('modal-produto-carrossel').style.display = 'none';
}

// ================= CATÁLOGO E MODAL =================
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
        const catList = document.getElementById('category-list');
        if (catList) catList.style.display = 'none';
        area.style.display = 'flex';
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
    const modalBuyBtn = document.getElementById('modal-produto').querySelector('.buy-btn');
    modalBuyBtn.onclick = function(event) {
        event.stopPropagation();
        adicionarAoCarrinho(produto);
        fecharModalProduto();
    };
    document.getElementById('modal-produto').style.display = 'flex';
}

function fecharModalProduto() {
    document.getElementById('modal-produto').style.display = 'none';
}

// ================= PERFIL, LOGIN E REGISTRO =================
function renderPerfil() {
    const container = document.getElementById('perfil-container');
    if (!container) return;
    const usuario = usuarioLogado ? {
        id: usuarioLogado,
        nome: usuarioNome,
        email: usuarioEmail
    } : null;
    

    if (!usuario) {
        // CORREÇÃO: Caminho relativo (mesma pasta) e extensão correta (.php)
        container.innerHTML = `
            <h2>Área do Cliente</h2>
            <p>Faça login ou crie uma conta para ver seus dados e histórico.</p>
            <button class="perfil-btn" onclick="window.location.href='Login.php'">Fazer Login</button>
            <button class="perfil-btn" onclick="window.location.href='Registro.php'">Registrar</button>
        `;
    } else {
        // SE ESTIVER LOGADO, MOSTRA TODAS AS OPÇÕES
        container.innerHTML = `
            <h2>Bem-vindo, ${usuario.nome}!</h2>
            <button class="perfil-btn" onclick="mostrarConta()">Configurações de Conta</button>
            <button class="perfil-btn" onclick="mostrarPagamentos()">Métodos de Pagamento</button>
            <button class="perfil-btn" onclick="mostrarHistorico()">Histórico</button>
            <button class="perfil-btn" onclick="mostrarContato()">Contato com a Loja</button>
            <button class="logout-btn perfil-btn" onclick="logout()">Logout</button>
            <div id="perfil-form-area"></div>
        `;
    }
}

function mostrarHistorico() {
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `<div class="perfil-form"><p>Nenhum histórico de compras encontrado.</p></div>`;
}

function mostrarContato() {
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `<div class="perfil-form"><p>Email: contato@astrostore.com</p></div>`;
}

function mostrarPagamentos() {
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `<div class="perfil-form"><p>Nenhum método de pagamento salvo.</p></div>`;
}

function mudarNome(e) {
    e.preventDefault();
    const novoNome = document.getElementById('novo-nome').value;
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario.nome = novoNome;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    renderPerfil(); // Re-renderiza o perfil para mostrar o nome atualizado no "Bem-vindo"
    alert('Nome alterado com sucesso!');
}

function mudarSenha(e) {
    e.preventDefault();
    const novaSenha = document.getElementById('nova-senha').value;
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario.senha = novaSenha;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Senha alterada com sucesso!');
    document.getElementById('perfil-form-area').innerHTML = ''; // Limpa a área do formulário
}

function logout() {
    window.location.href = "../Controller/logout.php";
}


function atualizarNomePerfilNav(nomeUsuario) {
    let perfilNav = document.getElementById('perfil-link');
    let nomeSpan = document.getElementById('perfil-nome-nav');
    if (!perfilNav) return;
    if (!nomeSpan) {
        nomeSpan = document.createElement('span');
        nomeSpan.id = 'perfil-nome-nav';
        perfilNav.appendChild(nomeSpan);
    }
    nomeSpan.textContent = nomeUsuario || '';
}

// ================= FUNCIONALIDADE DE PESQUISA =================
function realizarPesquisa(event) {
    event.preventDefault();
    const termoPesquisa = document.getElementById('search-input').value.trim().toLowerCase();
    
    if (!termoPesquisa) {
        alert('Digite algo para pesquisar!');
        return;
    }
    
    const resultados = buscarProdutos(termoPesquisa);
    mostrarResultadosPesquisa(resultados, termoPesquisa);
}

function buscarProdutos(termo) {
    const resultados = [];
    
    // Buscar em todas as categorias
    Object.keys(produtos).forEach(categoria => {
        produtos[categoria].forEach(produto => {
            const nomeMatch = produto.nome.toLowerCase().includes(termo);
            const descMatch = produto.desc.toLowerCase().includes(termo);
            const categoriaMatch = categoria.toLowerCase().includes(termo);
            
            if (nomeMatch || descMatch || categoriaMatch) {
                resultados.push({
                    ...produto,
                    categoria: categoria
                });
            }
        });
    });
    
    return resultados;
}

function mostrarResultadosPesquisa(resultados, termo) {
    const container = document.getElementById('resultados-pesquisa');
    
    if (resultados.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p style="color: #fff; font-size: 1.1rem;">
                    Nenhum produto encontrado para "<strong>${termo}</strong>"
                </p>
                <p style="color: #ccc; margin-top: 10px;">
                    Tente pesquisar por outros termos ou navegue pelo nosso catálogo.
                </p>
                <a href="catalogo.html" class="buy-btn" style="margin-top: 15px; text-decoration: none;">
                    Ver Catálogo Completo
                </a>
            </div>
        `;
    } else {
        container.innerHTML = `
            <p style="color: #ccc; margin-bottom: 15px;">
                Encontrados ${resultados.length} produto(s) para "<strong>${termo}</strong>":
            </p>
            <div style="max-height: 400px; overflow-y: auto;">
                ${resultados.map(produto => `
                    <div class="search-result-item" style="
                        background: rgba(35,35,87,0.8);
                        border-radius: 12px;
                        padding: 15px;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onclick="adicionarAoCarrinho(${JSON.stringify(produto).replace(/"/g, '&quot;')}); fecharModalPesquisa();">
                        <img src="${produto.img}" alt="${produto.nome}" style="
                            width: 60px;
                            height: 60px;
                            object-fit: contain;
                            border-radius: 8px;
                            background: #fff;
                            padding: 5px;
                        ">
                        <div style="flex: 1;">
                            <h4 style="color: #00bfff; margin-bottom: 5px;">${produto.nome}</h4>
                            <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 5px;">${produto.desc}</p>
                            <p style="color: #fff; font-weight: bold;">R$ ${produto.preco.toFixed(2)}</p>
                        </div>
                        <button class="buy-btn" style="
                            padding: 8px 15px;
                            font-size: 0.9rem;
                        ">Adicionar</button>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Adicionar efeito hover aos itens de resultado
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(106, 90, 205, 0.8)';
                this.style.transform = 'scale(1.02)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(35,35,87,0.8)';
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    document.getElementById('modal-pesquisa').style.display = 'flex';
}

function fecharModalPesquisa() {
    document.getElementById('modal-pesquisa').style.display = 'none';
    document.getElementById('search-input').value = '';
}

// ================= INICIALIZADOR PRINCIPAL =================
document.addEventListener('DOMContentLoaded', function() {
    
    // --- CARROSSEL ---
    const track = document.querySelector(".carrossel-track");
    if (track) {
        const items = document.querySelectorAll(".carrossel-item");
        const prevButton = document.querySelector(".prev");
        const nextButton = document.querySelector(".next");
        if (prevButton && nextButton && items.length > 0) {
            let currentIndex = 0;
            function updateCarousel() { track.style.transform = `translateX(-${currentIndex * 100}%)`; }
            nextButton.addEventListener("click", () => { currentIndex = (currentIndex + 1) % items.length; updateCarousel(); });
            prevButton.addEventListener("click", () => { currentIndex = (currentIndex - 1 + items.length) % items.length; updateCarousel(); });
            setInterval(() => { currentIndex = (currentIndex + 1) % items.length; updateCarousel(); }, 4000);
        }
    }

    // --- PÁGINA DE PERFIL ---
    if (document.getElementById('perfil-container')) {
        renderPerfil();
    }
    
    // --- PÁGINA DE CATÁLOGO ---
    if (document.querySelector('.catalog-container')) {
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', function() {
                mostrarProdutos(this.dataset.category);
            });
        });
        const closeModalBtn = document.getElementById('close-modal');
        const modalProduto = document.getElementById('modal-produto');
        if (closeModalBtn && modalProduto) {
            closeModalBtn.addEventListener('click', fecharModalProduto);
            modalProduto.addEventListener('click', function(e) { if (e.target === this) fecharModalProduto(); });
        }
    }
    
    // --- ATUALIZA NOME DE USUÁRIO NA NAVEGAÇÃO (EM TODAS AS PÁGINAS) ---
    //const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    //if (usuarioLogado) {
    //    atualizarNomePerfilNav(usuarioLogado.usuario);
    //}
    
    // Fechar modal de pesquisa ao clicar fora
    const modalPesquisa = document.getElementById('modal-pesquisa');
    if (modalPesquisa) {
        modalPesquisa.addEventListener('click', function(e) {
            if (e.target === this) {
                fecharModalPesquisa();
            }
        });
    }
    
    // Pesquisa com Enter
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarPesquisa(e);
            }
        });
    }
});

// Verifica login via variável PHP

// Ícone de perfil
const perfilLink = document.getElementById("perfil-link");

// Modal
const modal = document.getElementById("modal-aviso");
const modalText = document.getElementById("modal-aviso-text");
const modalBtn = document.getElementById("modal-avisobtn");

if (perfilLink) {
    perfilLink.addEventListener("click", function (e) {

        if (!usuarioLogado) {
            e.preventDefault(); // impede abrir o perfil

            modalText.textContent = "Você precisa fazer login primeiro!";
            modal.style.display = "flex";

            // Botão OK → leva para Login.php
            modalBtn.onclick = function () {
                window.location.href = "Login.php";
            };
        }
    });
}

// Fechar modal ao clicar fora
if (modal) {
    modal.addEventListener("click", function (e) {
        if (e.target === this) {
            modal.style.display = "none";
        }
    });
}

