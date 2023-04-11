const express = require('express')
const router = express.Router()
const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres', // Update with your database username
  password: 'password', // Update with your database password
  host: 'localhost', // Update with your database host
  database: 'mydb', // Update with your database name
  port: 5432 // Update with your database port
});

// Connect to the PostgreSQL server
pool.connect()
  .then(() => console.log('Connected to the PostgreSQL server!'))
  .catch(err => console.error('Failed to connect to PostgreSQL server:', err));
// Create a route for the dashboard

router.get('/dashboard', (req, res) => {
  // Check if user is logged in (you can implement your own logic for this)
  const isLoggedIn = true; // Update with your own logic

  if (isLoggedIn) {
    // Fetch data from the PostgreSQL database
    const sql = 'SELECT * FROM products'; // Update with your own SQL query
    pool.query(sql)
      .then(results => {
        // Render the dashboard view with the fetched data
        res.render('dashboard', { products: results.rows });
      })
      .catch(err => {
        console.error('Failed to fetch data from PostgreSQL:', err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // Redirect to login page if user is not logged in
    res.redirect('/login'); // Update with your login route
  }
});

module.exports = router