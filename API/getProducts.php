<?php
header("Content-Type: application/json");
include 'db.php';  // Ensure you have your database connection established in this file

if ($_GET['action'] === 'get_product_details') {
    try {
        // Prepare and execute the query for product details
        $stmt = $conn->prepare("SELECT product_name, low_stock_count, all_items_count FROM product_details");
        $stmt->execute();

        // Fetch the results
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Initialize the response with default values
        $response = [
            'low_stock_items' => 0,
            'all_items_groups' => 0,
            'all_items' => 0,
        ];

        // Loop through the product data and update the response
        foreach ($products as $product) {
            $response['low_stock_items'] = $product['low_stock_count'];
            $response['all_items_groups'] = $product['all_items_count'];
            $response['all_items'] = $product['all_items_count'];  // Assuming all items groups is the same as all items
        }

        // Return the response as a JSON object
        echo json_encode($response);

    } catch (PDOException $e) {
        // Handle the error and send a JSON response with the error message
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
