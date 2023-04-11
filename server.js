// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Set up the EJS view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for serving login page UI
app.use('/login', require('./router/login'))
app.use('/dashboard', require('./router/showInDashboard'))
app.use('/excel', require('./router/excel'))
app.use('/crud', require('./router/crud'))
app.use('/rating', require('./router/rating'))
app.use('/search', require('./router/search'))

const authenticate = (req, res, next) => {
    // Check if user is logged in (you can implement your own logic for this)
    const isLoggedIn = true; // Update with your own logic
  
    if (isLoggedIn) {
      // If user is logged in, call the next middleware or route handler
      next();
    } else {
      // Redirect to login page if user is not logged in
      res.redirect('/login'); // Update with your login route
    }
  };

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
