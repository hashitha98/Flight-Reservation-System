<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once('../core/initialize.php');

    $ticket = new Ticket($db);

    $data = json_decode(file_get_contents("php://input"));

    $ticket->email = $data->email;
    $ticket->flight_id = $data->flight_id;

    if(($data->email) != "") {
        if($ticket->book_ticket()) {
            echo json_encode(
                array('message' => 'Flight booked succesfully')
            );
        } else {
            echo json_encode(
                array('message' => 'Booking Failed')
            );
        }
    }