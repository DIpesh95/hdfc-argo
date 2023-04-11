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

// Add a route for handling product search (GET operation)
router.get('/dashboard/search', authenticate, (req, res) => {
    const { keyword } = req.query;
  
    // Search products in the PostgreSQL database
    const sql = 'SELECT * FROM products WHERE name ILIKE $1'; // ILIKE for case-insensitive search
    const values = [`%${keyword}%`]; // Use wildcard % before and after the keyword for partial match
    pool.query(sql, values)
      .then(result => {
        const products = result.rows;
        res.render('dashboard', { products }); // Render the dashboard view with search results
      })
      .catch(err => {
        console.error('Failed to search data in PostgreSQL:', err);
        res.status(500).send('Internal Server Error');
      });
  });

  // Update the dashboard route to fetch all products
router.get('/dashboard', authenticate, (req, res) => {
    // Fetch all products from the PostgreSQL database
    const sql = 'SELECT * FROM products';
    pool.query(sql)
      .then(result => {
        const products = result.rows;
        res.render('dashboard', { products }); // Render the dashboard view with all products
      })
      .catch(err => {
        console.error('Failed to fetch data from PostgreSQL:', err);
        res.status(500).send('Internal Server Error');
      });
  });
  
  
  module.exports = router   