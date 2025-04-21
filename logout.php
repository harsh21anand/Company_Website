<?php
// Include config file
require_once 'config/config.php';

// Clear all session data
session_unset();
session_destroy();

// Redirect to login page
header('Location: auth.html');
exit();
?>