<?php

// Database connection details (replace with your actual credentials)
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Flag to indicate successful form submission (initially false)
$formSubmitted = false;

// Process form submission if the form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Sanitize user input to prevent SQL injection (prepared statements)
  $name = mysqli_real_escape_string($conn, $_POST["name"]);
  $email = mysqli_real_escape_string($conn, $_POST["email"]);
  $message = mysqli_real_escape_string($conn, $_POST["message"]); // Assuming message comes from the textarea

  // Create a prepared statement to insert data
  $sql = "INSERT INTO your_table_name (name, email, message) VALUES (?, ?, ?)";
  $stmt = mysqli_prepare($conn, $sql);

  // Bind values to the prepared statement
  mysqli_stmt_bind_param($stmt, "sss", $name, $email, $message);

  // Execute the prepared statement
  if (mysqli_stmt_execute($stmt)) {
    $formSubmitted = true;
  } else {
    echo "Error inserting data: " . mysqli_error($conn);
  }

  // Close the prepared statement
  mysqli_stmt_close($stmt);
}

// Close the database connection
mysqli_close($conn);

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form</title>
  <style>
    /* Add your form styling here (optional) */
  </style>
</head>
<body>

<?php
// Display success message or form if submission was not successful
if ($formSubmitted) {
  echo "<p>Form submitted successfully!</p>";
} else {
?>

  <form onsubmit="return validateForm()" class="contact__form" action="form.php" method="post">
    <input type="text" name="name" placeholder="Name" class="contact__input" required>
    <input type="email" name="email" placeholder="Email" class="contact__input" required>
    <textarea name="message" cols="30" rows="10" class="contact__input" required></textarea>
    <input type="submit" value="Send" class="contact__button button">
  </form>

<?php } ?>

</body>
</html>
