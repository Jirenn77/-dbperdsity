<?php

require_once 'getBalance.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

error_log("Raw JSON input: " . file_get_contents("php://input"));

$data = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Invalid JSON input', 'json_error' => json_last_error_msg()]);
    exit;
}

error_log("Decoded JSON: " . print_r($data, true));

if (!isset($data['email'], $data['password'])) {
    echo json_encode(['error' => 'Missing parameters', 'received' => $data]);
    exit;
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    if ($action === 'login') {
        login($pdo, $data);
    } elseif ($action === 'register') {
        register($pdo, $data);
    } else {
        echo json_encode(['error' => 'Invalid action']);
    }
} else {
    echo json_encode(['error' => 'Action parameter is missing']);
}

// Login function
function login($pdo, $data) {
    if (!isset($data['email'], $data['password'])) {
        echo json_encode(['error' => 'Missing parameters', 'received' => $data]);
        return;
    }

    $email = $data['email'];
    $password = $data['password'];

    // Check users table
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Log user data for debugging
    error_log("User data from users table: " . print_r($user, true));

    if ($user && password_verify($password, $user['password'])) {
        unset($user['password']); // Remove password from response
        echo json_encode([
            'success' => 'Login successful',
            'user' => $user,
            'redirectTo' => 'home.php' // Add this to redirect
        ]);
        return;
    }

    // Check admin table
    $adminStmt = $pdo->prepare("SELECT * FROM admin WHERE email = ?");
    $adminStmt->execute([$email]);
    $admin = $adminStmt->fetch();

    // Log admin data for debugging
    error_log("Admin data from admin table: " . print_r($admin, true));

    if ($admin && password_verify($password, $admin['password'])) {
        unset($admin['password']); // Remove password from response
        echo json_encode([
            'success' => 'Admin login successful',
            'admin' => $admin,
            'redirectTo' => 'admin_dashboard.php' // Redirect to admin dashboard
        ]);
        return;
    }

    echo json_encode(['error' => 'Invalid email or password']);
}

// Register function
function register($pdo, $data) {
    if (!isset($data['email'], $data['password'], $data['role'])) {
        echo json_encode(['error' => 'Missing parameters', 'received' => $data]);
        return;
    }

    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);
    $role = $data['role'];

    try {
        if ($role === 'customer') {
            $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
            $stmt->execute([$email, $password]);
            echo json_encode(['success' => 'Customer registered successfully']);
        } else {
            $stmt = $pdo->prepare("INSERT INTO admin (email, password, role) VALUES (?, ?, ?)");
            $stmt->execute([$email, $password, $role]);
            echo json_encode(['success' => ucfirst($role) . ' registered successfully']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
