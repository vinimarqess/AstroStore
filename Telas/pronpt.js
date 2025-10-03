// VERSÃO FINAL COM PERFIL COMPLETO - 02/10/2025

// ================= DADOS DOS PRODUTOS =================
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

// ================= CARRINHO =================
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
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
        // Se não estiver logado, mostra botões de Login/Registro
        container.innerHTML = `
            <h2>Área do Cliente</h2>
            <p>Faça login ou crie uma conta para ver seus dados e histórico.</p>
            <button class="perfil-btn" onclick="window.location.href='Login.html'">Fazer Login</button>
            <button class="perfil-btn" onclick="window.location.href='Registro.html'">Registrar</button>
        `;
    } else {
        // SE ESTIVER LOGADO, MOSTRA TODAS AS OPÇÕES (CORRIGIDO)
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

function mostrarConta() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `
        <form class="perfil-form" onsubmit="mudarNome(event)">
            <input type="text" id="novo-nome" placeholder="Novo nome" value="${usuario.nome}" required>
            <button class="perfil-btn" type="submit">Alterar Nome</button>
        </form>
        <form class="perfil-form" onsubmit="mudarSenha(event)">
            <input type="password" id="nova-senha" placeholder="Nova senha" required>
            <button class="perfil-btn" type="submit">Alterar Senha</button>
        </form>
    `;
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

function registrarUsuario(nome, usuario, email, senha) {
    const novoUsuario = { nome, usuario, email, senha, notificacao: false };
    localStorage.setItem('usuario', JSON.stringify(novoUsuario));
    return true;
}

function loginUsuario(email, senha) {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.email === email && usuario.senha === senha) {
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('usuario');
    renderPerfil(); // Re-renderiza para mostrar os botões de login/registro
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

// ================= INICIALIZADOR PRINCIPAL =================
document.addEventListener('DOMContentLoaded', function() {
    
    // --- CARROSSEL ---
    const track = document.querySelector(".carousel-track");
    if (track) {
        const items = document.querySelectorAll(".carousel-item");
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

    // --- PÁGINA DE LOGIN ---
    const loginForm = document.getElementById('loginFormPage');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            const errorDiv = document.getElementById('login-error-message');
            if (loginUsuario(email, senha)) {
                alert('Login bem-sucedido!');
                window.location.href = 'perfil.html';
            } else {
                errorDiv.textContent = 'E-mail ou senha incorretos.';
            }
        });
    }

    // --- PÁGINA DE REGISTRO ---
    const registerForm = document.getElementById('registerFormPage');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('reg-nome').value;
            const usuario = document.getElementById('reg-usuario').value;
            const email = document.getElementById('reg-email').value;
            const senha = document.getElementById('reg-senha').value;
            const confirmaSenha = document.getElementById('reg-confirma-senha').value;
            const errorDiv = document.getElementById('register-error-message');
            errorDiv.textContent = '';
            if (senha.length < 6) {
                errorDiv.textContent = 'A senha deve ter no mínimo 6 caracteres.';
                return;
            }
            if (senha !== confirmaSenha) {
                errorDiv.textContent = 'As senhas não coincidem!';
                return;
            }
            if (registrarUsuario(nome, usuario, email, senha)) {
                alert('Conta criada com sucesso! Você será redirecionado para o login.');
                window.location.href = 'Login.html';
            }
        });
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
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioLogado) {
        atualizarNomePerfilNav(usuarioLogado.usuario);
    }
});