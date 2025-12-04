<?php

if(session_status() != PHP_SESSION_ACTIVE){
    session_start();
}

//DESTROI A SESSÃO
session_unset();
header("Location: ../View/TelaInicial.php?msg=" . urlencode("Você saiu da conta."));
exit;