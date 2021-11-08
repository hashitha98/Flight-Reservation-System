<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once('../core/initialize.php');

    $user = new User($db);

    $data = json_decode(file_get_contents("php://input"));

    $user->email = $data->email;
    $user->password = $data->password;

    $result = $user->login();
    $num = $result->rowCount();

    if($num > 0) {
        echo json_encode(
            array('message' => "Authentication successful")
        );
    } else {
        echo json_encode(
            array('message' => 'Authentication failed')
        );
    }