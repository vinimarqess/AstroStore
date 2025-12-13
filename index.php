<?php
// Router Principal Astro Store
// Gerencia o roteamento de todas as paginas da aplicação

// Inicia a sessão (necessário para todas as páginas)
session_start();

$allowed = [
    'TelaInicial',
    'catalogo',
    'Carrinho',
    'EditarPerfil',
    'gerenciarUsuarios',
    'Login',
    'pagamento',
    'perfil',
    'Registro',
    'teste'
];


$page = $_GET['page'] ?? 'TelaInicial';
$page = basename($page);
$page = preg_replace('/[^a-zA-Z0-9_]/', '', $page);

if (!in_array($page, $allowed)) {
    http_response_code(404);
    die('Erro 404: Página não encontrada.');
}

$path = __DIR__ . '/View/' . $page . '.php';

if (file_exists($path)) {
    require_once $path;
} else {
    http_response_code(404);
    die('Erro 404: Arquivo não encontrado.');
}
