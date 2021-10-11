<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get posted data
$data = json_decode(file_get_contents("php://input"));
$met = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$variablepar1 = $_REQUEST['id'];

// make sure data is not empty
if(
    !empty($data->id) &&
    !empty($data->name) &&
    !empty($data->description) &&
    !empty($data->price)
){
    http_response_code(200);

    echo json_encode(array(
        "method" => $met,
        "message" => "Data was received.",
        "data-received" => array(
          "id" => $data->id,
          "name" => $data->name,
          "description" => $data->description,
          "price" => $data->price
        )
      )
    );
}else{
    http_response_code(503);
    echo json_encode(array("message" => "No data was received"));
}
?>
