<?php
// router
// inclui arquivos PHP da pasta View

$allowed = [
    'TelaInicial', 'catalogo', 'Carrinho', 'EditarPerfil', 'index', 'Login', 'pagamento', 'perfil', 'Registro', 'teste'
];

$page = isset($_GET['page']) ? $_GET['page'] : 'TelaInicial';
// limpar entrada para evitar traversal
$page = preg_replace('/[^a-zA-Z0-9_]/', '', $page);

if (!in_array($page, $allowed)) {
    header("HTTP/1.0 404 Not Found");
    echo "Página não encontrada.";
    exit;
}

$path = __DIR__ . DIRECTORY_SEPARATOR . 'View' . DIRECTORY_SEPARATOR . $page . '.php';

if (file_exists($path)) {
    include $path;
} else {
    header("HTTP/1.0 404 Not Found");
    echo "Página não encontrada.";
}
