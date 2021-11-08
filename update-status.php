<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once('../core/initialize.php');

    $flight = new Flight($db);

    $data = json_decode(file_get_contents("php://input"));

    $flight->status = $data->status;
    $flight->id = $data->id;

    if($flight->update_status()) {
        echo json_encode(
            array('message' => 'Updated')
        );
    } else {
        echo json_encode(
            array('message' => 'Failed')
        );
    }