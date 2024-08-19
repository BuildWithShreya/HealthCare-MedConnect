<?php
// book_appointment.php

// Database connection
$servername = "localhost";
$username = "root"; // Update if different
$password = "Shreya@1305"; // Update if different
$dbname = "medconnect"; // Update with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect POST data
$name = $_POST['patientName'];
$email = $_POST['patientEmail'];
$appointment_date = $_POST['appointmentDate'];
$appointment_time = $_POST['appointmentTime'];
$doctor = $_POST['doctor'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO appointments (name, email, appointment_date, appointment_time, doctor) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $appointment_date, $appointment_time, $doctor);

if ($stmt->execute()) {
    echo "Appointment booked successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
