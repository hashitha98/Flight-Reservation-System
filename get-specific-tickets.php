<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../core/initialize.php');

    $ticket = new Ticket($db);

    $ticket->email = isset($_GET['email']) ? $_GET['email'] : die();

    $result = $ticket->get_specific_tickets();
    
    $num = $result->rowCount();

    if($num > 0) {
        $ticket_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $ticket_item = array (
                'id' => $id,
                'email' => $email,
                'flight_id' => $flight_id,
            );
           array_push($ticket_arr, $ticket_item);
        }
        echo json_encode($ticket_arr);
    }
    else {
        echo json_encode(array('message' => 'empty'));
    }