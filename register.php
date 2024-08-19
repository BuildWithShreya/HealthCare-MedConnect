<?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = "Shreya@1305"; // Use your actual MySQL root password here
$dbname = "medconnect"; // Update the database name here

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize message variable
$message = "";

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $specialization = $_POST['specialization'];
    $experience = $_POST['experience'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO doctors (name, email, specialization, experience) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $name, $email, $specialization, $experience);

    // Execute the statement
    if ($stmt->execute()) {
        $message = "New record created successfully";
    } else {
        $message = "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
    
    // Echo JavaScript to display alert
    echo "<script>
            alert('$message');
            window.location.href = 'register.html'; // Redirect back to the form page or another page
          </script>";
}
?>
