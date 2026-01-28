<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validatePhone($phone) {
    $phone = preg_replace('/[^0-9]/', '', $phone);
    return strlen($phone) >= 10 && strlen($phone) <= 15;
}

function generateTicketNumber() {
    $date = date('Ymd');
    $random = str_pad(mt_rand(0, 9999), 4, '0', STR_PAD_LEFT);
    return "TKT-" . $date . "-" . $random;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        echo json_encode([
            'success' => false,
            'message' => 'Data tidak valid'
        ]);
        exit;
    }

    // Sanitize and validate inputs
    $name = sanitizeInput($input['name'] ?? '');
    $email = sanitizeInput($input['email'] ?? '');
    $phone = sanitizeInput($input['phone'] ?? '');
    $category = sanitizeInput($input['category'] ?? '');
    $title = sanitizeInput($input['title'] ?? '');
    $description = sanitizeInput($input['description'] ?? '');
    
    // Validation
    if (empty($name) || empty($email) || empty($phone) || empty($category) || empty($title) || empty($description)) {
        echo json_encode([
            'success' => false,
            'message' => 'Semua field wajib diisi!'
        ]);
        exit;
    }

    if (!validateEmail($email)) {
        echo json_encode([
            'success' => false,
            'message' => 'Format email tidak valid!'
        ]);
        exit;
    }

    if (!validatePhone($phone)) {
        echo json_encode([
            'success' => false,
            'message' => 'Format nomor telepon tidak valid!'
        ]);
        exit;
    }

    if (strlen($description) < 20) {
        echo json_encode([
            'success' => false,
            'message' => 'Deskripsi minimal 20 karakter!'
        ]);
        exit;
    }

    // Generate ticket number
    $ticketNumber = generateTicketNumber();
    
    // Create complaint data
    $complaint = [
        'id' => uniqid(),
        'ticketNumber' => $ticketNumber,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'category' => $category,
        'title' => $title,
        'description' => $description,
        'status' => 'pending',
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ];

    // Save to JSON file (acting as database)
    $dataFile = 'data/complaints.json';
    $dataDir = dirname($dataFile);
    
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }
    
    $complaints = [];
    if (file_exists($dataFile)) {
        $jsonContent = file_get_contents($dataFile);
        $complaints = json_decode($jsonContent, true) ?: [];
    }
    
    $complaints[] = $complaint;
    file_put_contents($dataFile, json_encode($complaints, JSON_PRETTY_PRINT));

    // Send email notification (you would configure this with your email service)
    // sendNotificationEmail($complaint);

    echo json_encode([
        'success' => true,
        'message' => 'Pengaduan berhasil dikirim!',
        'data' => [
            'ticketNumber' => $ticketNumber,
            'status' => 'pending'
        ]
    ]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'track') {
    
    $ticketNumber = sanitizeInput($_GET['ticket'] ?? '');
    
    if (empty($ticketNumber)) {
        echo json_encode([
            'success' => false,
            'message' => 'Nomor tiket diperlukan!'
        ]);
        exit;
    }

    // Load complaints from JSON file
    $dataFile = 'data/complaints.json';
    if (!file_exists($dataFile)) {
        echo json_encode([
            'success' => false,
            'message' => 'Data tidak ditemukan!'
        ]);
        exit;
    }

    $complaints = json_decode(file_get_contents($dataFile), true) ?: [];
    $complaint = null;

    foreach ($complaints as $item) {
        if ($item['ticketNumber'] === $ticketNumber) {
            $complaint = $item;
            break;
        }
    }

    if ($complaint) {
        echo json_encode([
            'success' => true,
            'data' => $complaint
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Nomor tiket tidak ditemukan!'
        ]);
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'stats') {
    
    // Load complaints from JSON file
    $dataFile = 'data/complaints.json';
    $stats = [
        'total' => 0,
        'pending' => 0,
        'processing' => 0,
        'resolved' => 0,
        'rejected' => 0
    ];

    if (file_exists($dataFile)) {
        $complaints = json_decode(file_get_contents($dataFile), true) ?: [];
        $stats['total'] = count($complaints);
        
        foreach ($complaints as $complaint) {
            $status = $complaint['status'] ?? 'pending';
            if (isset($stats[$status])) {
                $stats[$status]++;
            }
        }
    }

    echo json_encode([
        'success' => true,
        'data' => $stats
    ]);

} else {
    echo json_encode([
        'success' => false,
        'message' => 'Metode request tidak valid!'
    ]);
}

function sendNotificationEmail($complaint) {
    // This is where you would implement email sending
    // Using PHPMailer, SendGrid, or other email service
    // For now, this is just a placeholder
    return true;
}
?>
