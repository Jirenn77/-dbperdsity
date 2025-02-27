<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db.php';

// Get the raw POST data
$rawData = file_get_contents("php://input");
error_log("Raw input data: " . $rawData); // Log the raw input data

// Decode the JSON data
$data = json_decode($rawData, true);
error_log("Decoded data: " . print_r($data, true)); // Log the decoded data

// Check if the action parameter is present
if (!isset($data['action'])) {
    error_log("Action parameter is missing in the payload."); // Log the missing action
    echo json_encode(['error' => 'Action parameter is missing']);
    exit();
}

// Extract the action from the data
$action = $data['action'];
error_log("Extracted action: " . $action); // Log the extracted action


try {
    switch ($action) {
        case 'add_item':
            // Add a new item
            $name = $data['name'];
            $category = $data['category'];
            $type = $data['type'];
            $stockQty = $data['stockQty'];
            $service = $data['service'];
            $description = $data['description'];
            $unitPrice = $data['unitPrice'];
            $supplier = $data['supplier'];

            $stmt = $conn->prepare("INSERT INTO items (name, category, type, stockQty, service, description, unitPrice, supplier) VALUES (:name, :category, :type, :stockQty, :service, :description, :unitPrice, :supplier)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':stockQty', $stockQty);
            $stmt->bindParam(':service', $service);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':unitPrice', $unitPrice);
            $stmt->bindParam(':supplier', $supplier);
            $stmt->execute();

            echo json_encode(['success' => 'Item added successfully']);
            break;

        case 'update_item':
            // Update an existing item
            $id = $data['id'];
            $name = $data['name'];
            $category = $data['category'];
            $type = $data['type'];
            $stockQty = $data['stockQty'];
            $service = $data['service'];
            $description = $data['description'];
            $unitPrice = $data['unitPrice'];
            $supplier = $data['supplier'];

            $stmt = $conn->prepare("UPDATE items SET name = :name, category = :category, type = :type, stockQty = :stockQty, service = :service, description = :description, unitPrice = :unitPrice, supplier = :supplier WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':stockQty', $stockQty);
            $stmt->bindParam(':service', $service);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':unitPrice', $unitPrice);
            $stmt->bindParam(':supplier', $supplier);
            $stmt->execute();

            echo json_encode(['success' => 'Item updated successfully']);
            break;

        case 'clone_item':
            // Clone an existing item
            $id = $data['id'];

            // Fetch the item to clone
            $stmt = $conn->prepare("SELECT * FROM items WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $item = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($item) {
                // Insert the cloned item
                $stmt = $conn->prepare("INSERT INTO items (name, category, type, stockQty, service, description, unitPrice, supplier) VALUES (:name, :category, :type, :stockQty, :service, :description, :unitPrice, :supplier)");
                $stmt->bindParam(':name', $item['name']);
                $stmt->bindParam(':category', $item['category']);
                $stmt->bindParam(':type', $item['type']);
                $stmt->bindParam(':stockQty', $item['stockQty']);
                $stmt->bindParam(':service', $item['service']);
                $stmt->bindParam(':description', $item['description']);
                $stmt->bindParam(':unitPrice', $item['unitPrice']);
                $stmt->bindParam(':supplier', $item['supplier']);
                $stmt->execute();

                echo json_encode(['success' => 'Item cloned successfully']);
            } else {
                echo json_encode(['error' => 'Item not found']);
            }
            break;

        case 'mark_as_inactive':
            // Mark an item as inactive
            $id = $data['id'];

            $stmt = $conn->prepare("UPDATE items SET status = 'inactive' WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            echo json_encode(['success' => 'Item marked as inactive']);
            break;

        case 'delete_item':
            // Delete an item
            $id = $data['id'];

            $stmt = $conn->prepare("DELETE FROM items WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            echo json_encode(['success' => 'Item deleted successfully']);
            break;

        case 'add_to_group':
            // Add an item to a group
            $id = $data['id'];
            $groupId = $data['groupId'];

            $stmt = $conn->prepare("UPDATE items SET group_id = :groupId WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':groupId', $groupId);
            $stmt->execute();

            echo json_encode(['success' => 'Item added to group successfully']);
            break;

        default:
            echo json_encode(['error' => 'Invalid action: ' . $action]);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>