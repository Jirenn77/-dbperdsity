<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$description = $data['description'];
$status = $data['status'];
$serviceLink = $data['serviceLink'];

try {
    $pdo = new PDO("mysql:host=your_host;dbname=dbcom", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare the SQL query
    $stmt = $pdo->prepare("INSERT INTO categories (name, description, status, service_link) VALUES (:name, :description, :status, :serviceLink)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':serviceLink', $serviceLink);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(["message" => "Category added successfully!"]);
    } else {
        echo json_encode(["message" => "Failed to add category."]);
    }
} catch (PDOException $e) {
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>