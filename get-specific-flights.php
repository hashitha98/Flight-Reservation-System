<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../core/initialize.php');

    $flight = new Flight($db);

    $flight->departure = isset($_GET['departure']) ? $_GET['departure'] : die();
    $flight->arrival = isset($_GET['arrival']) ? $_GET['arrival'] : die();

    $result = $flight->get_specific_flights();
    
    $num = $result->rowCount();

    if($num > 0) {
        $flight_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $flight_item = array (
                'id' => $id,
                'flight' => $flight,
                'date' => $date,
                'departure' => $departure,
                'departureTime' => $departureTime,
                'arrival' => $arrival,
                'arrivalTime' => $arrivalTime,
                'price' => $price,
                'status' => $status
            );
           array_push($flight_arr, $flight_item);
        }
        echo json_encode($flight_arr);
    }
    else {
        echo json_encode(array('message' => 'empty'));
    }