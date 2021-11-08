<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../core/initialize.php');

    $flight = new Flight($db);

    $result = $flight->get_all();

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