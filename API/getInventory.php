<?php
header("Content-Type: application/json");
include 'db.php'; // Ensure the PDO connection is included here

if ($_GET['action'] === 'get_inventory_summary') {
    try {
        // Prepare the query to fetch inventory data
        $stmt = $conn->prepare("SELECT quantity_in_hand, quantity_to_be_received FROM inventory LIMIT 1");
        $stmt->execute();

        // Fetch the result
        $inventory = $stmt->fetch(PDO::FETCH_ASSOC);

        // If inventory data is found, return it, else return default values
        if ($inventory) {
            echo json_encode($inventory);
        } else {
            echo json_encode(['quantity_in_hand' => 0, 'quantity_to_be_received' => 0]);
        }
    } catch (PDOException $e) {
        // Handle any errors and send a response with error message
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
