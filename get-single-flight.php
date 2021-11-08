<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../core/initialize.php');

    $flight = new Flight($db);

    $flight->id = isset($_GET['id']) ? $_GET['id'] : die();

    $flight->read_single();
    
    $flight_arr = array (
        'id' => $flight->id,
        'flight' => $flight->flight,
        'date' => $flight->date,
        'departure' => $flight->departure,
        'departureTime' => $flight->departureTime,
        'arrival' => $flight->arrival,
        'arrivalTime' => $flight->arrivalTime,
        'price' => $flight->price,
        'status' => $flight->status
        
    );

    print_r(json_encode($flight_arr));