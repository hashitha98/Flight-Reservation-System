<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once('../core/initialize.php');

    $user = new User($db);

    $data = json_decode(file_get_contents("php://input"));

    $user->nid = $data->nid;
    $user->name = $data->name;
    $user->email = $data->email;
    $user->password = $data->password;

    if(($data->nid) != "") {
        if($user->register()) {
            echo json_encode(
                array('message' => 'Registration Succesfully')
            );
        } else {
            echo json_encode(
                array('message' => 'Registration Failed')
            );
        }
    }