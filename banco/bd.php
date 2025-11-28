<?php
    define('HOST', 'localhost');
    define('USER', 'root');
    define('PASSWORD', '');
    define('BANCO', 'astro');

    $conn = mysqli_connect(HOST, USER, PASSWORD, BANCO) or die ('Não foi possível conectar ao banco de dados.');

?>