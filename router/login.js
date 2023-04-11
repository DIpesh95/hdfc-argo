const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(`
      <h2>Login</h2>
      <form onsubmit="login()">
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" required>
        <br>
        <button type="submit">Login</button>
      </form>
      <p id="error" style="color: red;"></p>
      <script>
        function login() {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const error = document.getElementById('error');
  
          // Send login request to the API
          fetch('login/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          .then(response => {
            if (response.ok) {
              // Login successful, perform necessary actions
              window.location.href = 'login/dashboard';
            } else {
              // Login failed, display error message
              error.textContent = 'Invalid email or password';
            }
          })
          .catch(error => {
            console.error(error);
          });
          
          return false;
        }
      </script>
    `);
  });
  
  // Route for handling login requests

  
  router.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    // Perform login logic here, e.g., validate email and password
    if (email === 'dipesh12@gmail.com' && password === 'd@12345') {
      // Return success response
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // Return error response
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  });
  
  // Route for serving dashboard page UI
  router.get('/dashboard', (req, res) => {
    // Authenticate user and serve dashboard UI
    res.send(`
      <h2>Dashboard</h2>
      <!-- Display dashboard content here -->
    `);
  });

  module.exports = router