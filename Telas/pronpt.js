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

// ================= PERFIL =================
function renderPerfil() {
    const container = document.getElementById('perfil-container');
    if (!container) return;
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
        container.innerHTML = `
            <h2>Perfil</h2>
            <button class="perfil-btn" onclick="mostrarLogin()">Login</button>
            <button class="perfil-btn" onclick="mostrarRegistro()">Registrar</button>
            <div id="perfil-form-area"></div>
        `;
    } else {
        container.innerHTML = `
            <h2>Bem-vindo, ${usuario.nome}!</h2>
            <button class="perfil-btn" onclick="mostrarConta()">Configurações de Conta</button>
            <button class="perfil-btn" onclick="mostrarPagamentos()">Métodos de Pagamento</button>
            <button class="perfil-btn" onclick="mostrarHistorico()">Histórico</button>
            <button class="perfil-btn" onclick="mostrarContato()">Contato com a Loja</button>
            <button class="logout-btn perfil-btn" onclick="logout()">Logout</button>
            <div id="perfil-form-area"></div>
        `;
        atualizarNomePerfilNav(usuario.usuario);
    }
}

function mostrarLogin() {
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `
        <form class="perfil-form" onsubmit="login(event)">
            <input type="email" id="login-email" placeholder="E-mail" required>
            <input type="password" id="login-senha" placeholder="Senha" required>
            <button class="perfil-btn" type="submit">Entrar</button>
        </form>
    `;
}

function mostrarRegistro() {
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `
        <form class="perfil-form" onsubmit="registrar(event)">
            <input type="text" id="reg-nome" placeholder="Nome completo" required>
            <input type="text" id="reg-usuario" placeholder="Nome de usuário" required>
            <input type="email" id="reg-email" placeholder="E-mail" required>
            <input type="password" id="reg-senha" placeholder="Senha" required>
            <button class="perfil-btn" type="submit">Registrar</button>
        </form>
    `;
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
        <div class="perfil-form">
            <label>
                <input type="checkbox" id="notificacao" ${usuario.notificacao ? 'checked' : ''}>
                Receber notificações por e-mail
            </label>
            <button class="perfil-btn" onclick="salvarNotificacao()" type="button">Salvar Preferência</button>
        </div>
    `;
}

function mostrarHistorico() {
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `
        <div class="perfil-form">
            <p>Histórico de compras (exemplo):</p>
            <ul>
                <li>Compra 1 - 01/09/2025</li>
                <li>Compra 2 - 15/09/2025</li>
                <li>Compra 3 - 28/09/2025</li>
            </ul>
        </div>
    `;
}

function mostrarContato() {
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `
        <div class="perfil-form">
            <p>Entre em contato com a loja:</p>
            <p>Email: <a href="mailto:contato@astrostore.com.br">contato@astrostore.com.br</a></p>
            <p>WhatsApp: <a href="https://wa.me/5599999999999" target="_blank">(99) 99999-9999</a></p>
        </div>
    `;
}

function registrar(e) {
    e.preventDefault();
    const nome = document.getElementById('reg-nome').value;
    const usuario = document.getElementById('reg-usuario').value;
    const email = document.getElementById('reg-email').value;
    const senha = document.getElementById('reg-senha').value;
    localStorage.setItem('usuario', JSON.stringify({ nome, usuario, email, senha, notificacao: false }));
    renderPerfil();
}

function login(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.email === email && usuario.senha === senha) {
        renderPerfil();
    } else {
        alert('E-mail ou senha incorretos!');
    }
}

function logout() {
    localStorage.removeItem('usuario');
    renderPerfil();
    atualizarNomePerfilNav(null);
}

function mudarNome(e) {
    e.preventDefault();
    const novoNome = document.getElementById('novo-nome').value;
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario.nome = novoNome;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    renderPerfil();
}

function mudarSenha(e) {
    e.preventDefault();
    const novaSenha = document.getElementById('nova-senha').value;
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario.senha = novaSenha;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Senha alterada com sucesso!');
    renderPerfil();
}

function salvarNotificacao() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario.notificacao = document.getElementById('notificacao').checked;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Preferência de notificação salva!');
}

function mostrarPagamentos() {
    const area = document.getElementById('perfil-form-area');
    if (!area) return;
    area.innerHTML = `
        <div class="perfil-form">
            <h3 style="color:#00bfff;margin-bottom:10px;">Métodos de Pagamento</h3>
            <p style="color:#ffb300;font-size:1rem;margin-bottom:10px;">
                Desculpe, no momento só aceitamos pagamento via <strong>Pix à vista</strong>.
            </p>
            <div style="background:#fff;border-radius:12px;padding:18px 0;box-shadow:0 2px 12px #0002;width:100%;max-width:320px;display:flex;flex-direction:column;align-items:center;margin:0 auto;">
                <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-bc-logo-0.png" alt="Pix" style="width:90px;height:auto;margin-bottom:10px;">
                <span style="font-size:1.1rem;color:#232357;font-weight:bold;">Pagamento via Pix</span>
            </div>
        </div>
    `;
}

// Função para atualizar o nome de usuário abaixo do ícone de perfil na barra de navegação
function atualizarNomePerfilNav(nomeUsuario) {
    let perfilNav = document.getElementById('perfil-link');
    let nomeSpan = document.getElementById('perfil-nome-nav');
    if (!perfilNav) return;
    if (!nomeSpan) {
        nomeSpan = document.createElement('span');
        nomeSpan.id = 'perfil-nome-nav';
        nomeSpan.style.display = 'block';
        nomeSpan.style.fontSize = '0.85rem';
        nomeSpan.style.color = '#fff';
        nomeSpan.style.lineHeight = '1.1';
        nomeSpan.style.marginTop = '2px';
        nomeSpan.style.fontWeight = 'bold';
        nomeSpan.style.letterSpacing = '0.5px';
        nomeSpan.style.textShadow = '0 1px 4px #0008';
        perfilNav.appendChild(nomeSpan);
    }
    if (nomeUsuario) {
        nomeSpan.textContent = nomeUsuario;
        nomeSpan.style.display = 'block';
    } else {
        nomeSpan.textContent = '';
        nomeSpan.style.display = 'none';
    }
}

// Função para animar o título da loja
function animarTituloAstro() {
    const titulo = document.querySelector('.astro-title');
    if (!titulo) return;
    titulo.classList.remove('animar-titulo');
    // Força o reflow para reiniciar a animação
    void titulo.offsetWidth;
    titulo.classList.add('animar-titulo');
}

// Anima ao carregar a página
document.addEventListener('DOMContentLoaded', animarTituloAstro);

// Anima ao clicar em qualquer link da barra de navegação
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            animarTituloAstro();
        });
    });
});

// Inicialização automática do perfil ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do perfil (só executa se existir o container)
    if (document.getElementById('perfil-container')) {
        renderPerfil();
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario && usuario.usuario) {
            atualizarNomePerfilNav(usuario.usuario);
        }
    }

    // Inicialização do modal de produto (só executa se existir o modal)
    const closeModalBtn = document.getElementById('close-modal');
    const modalProduto = document.getElementById('modal-produto');
    if (closeModalBtn && modalProduto) {
        closeModalBtn.addEventListener('click', fecharModalProduto);
        modalProduto.addEventListener('click', function(e) {
            if (e.target === this) fecharModalProduto();
        });
    }

    // Inicialização do catálogo (só executa se existir categoria)
    const categorias = document.querySelectorAll('.category-card');
    if (categorias.length) {
        categorias.forEach(card => {
            card.addEventListener('click', function() {
                mostrarProdutos(this.dataset.category);
            });
        });
    }
});

// Telas de registro e login (Nathan)


// Adiciona os novos listeners dentro do 'DOMContentLoaded' para garantir que a página carregou
document.addEventListener('DOMContentLoaded', function() {
    
    // Lógica para o formulário de REGISTRO
    const registerForm = document.getElementById('registerForm');
    if(registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formulário

            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const errorMessageDiv = document.getElementById('errorMessage');

            // Limpa erros anteriores
            errorMessageDiv.textContent = ''; 

            if (password.length < 6) {
                errorMessageDiv.textContent = 'A senha deve ter no mínimo 6 caracteres.';
                return;
            }

            if (password !== confirmPassword) {
                errorMessageDiv.textContent = 'As senhas não coincidem!';
                return;
            }

            // Se tudo estiver certo
            alert('Conta criada com sucesso!');
            window.location.href = 'login.html'; // Redireciona para a página de login
        });
    }

    // Lógica para o formulário de LOGIN
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formulário
            
            const email = document.getElementById('loginEmail').value;

            // Simulação de login
            alert(`Login bem-sucedido! Bem-vindo(a), ${email}!`);
            window.location.href = 'TelaInicial.html'; // Redireciona para a página inicial
        });
    }

});