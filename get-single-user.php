<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../core/initialize.php');

    $user = new User($db);

    $user->email = isset($_GET['email']) ? $_GET['email'] : die();

    $user->read_single();
    
    $user_arr = array (
        'nid' => $user->nid,
        'name' => $user->name,
        'email' => $user->email,
        'password' => $user->password
    );

    print_r(json_encode($user_arr));