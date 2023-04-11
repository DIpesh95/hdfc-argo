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


// Add a route for handling product filter (GET operation)
router.get('/dashboard/filter', authenticate, (req, res) => {
    const { filterBy, filterValue } = req.query;
  
    // Filter products in the PostgreSQL database based on filterBy and filterValue
    let sql = '';
    let values = [];
    if (filterBy === 'price') {
      sql = 'SELECT * FROM products WHERE price <= $1 ORDER BY price ASC';
      values = [filterValue];
    } else if (filterBy === 'rating') {
      sql = 'SELECT * FROM products WHERE rating >= $1 ORDER BY rating DESC';
      values = [filterValue];
    } else {
      // Invalid filterBy value
      return res.status(400).send('Bad Request');
    }
  
    pool.query(sql, values)
      .then(result => {
        const products = result.rows;
        res.render('dashboard', { products }); // Render the dashboard view with filtered products
      })
      .catch(err => {
        console.error('Failed to filter data in PostgreSQL:', err);
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