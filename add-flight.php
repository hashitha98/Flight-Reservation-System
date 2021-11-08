<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once('../core/initialize.php');

    $flight = new Flight($db);

    $data = json_decode(file_get_contents("php://input"));

    $flight->flight = $data->flight;
    $flight->date = $data->date;
    $flight->departure = $data->departure;
    $flight->departureTime = $data->departureTime;
    $flight->arrival = $data->arrival;
    $flight->arrivalTime = $data->arrivalTime;
    $flight->price = $data->price;
    $flight->status = 'Schedule';

    if(($data->flight) != "") {
        if($flight->create()) {
            echo json_encode(
                array('message' => "Flight added")
            );
        } else {
            echo json_encode(
                array('message' => 'Failed')
            );
        }
    }
    