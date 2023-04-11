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

// Create a route for the dashboard (READ operation)
router.get('/dashboard', authenticate, (req, res) => {
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
  });
  
  // Create a route for adding a new product (CREATE operation)
  router.post('/dashboard/add', authenticate, (req, res) => {
    // Extract data from request body
    const { name, price, rating } = req.body;
  
    // Insert new product into the PostgreSQL database
    const sql = 'INSERT INTO products (name, price, rating) VALUES ($1, $2, $3)';
    const values = [name, price, rating];
    pool.query(sql, values)
      .then(() => {
        res.redirect('/dashboard'); // Redirect to dashboard after successful creation
      })
      .catch(err => {
        console.error('Failed to insert data into PostgreSQL:', err);
        res.status(500).send('Internal Server Error');
      });
  });
  
  // Create a route for updating a product (UPDATE operation)
  router.post('/dashboard/edit/:id', authenticate, (req, res) => {
    // Extract data from request body and URL parameter
    const { id } = req.params;
    const { name, price, rating } = req.body;
    
    // Update product in the PostgreSQL database
    const sql = 'UPDATE products SET name = $1, price = $2, rating = $3 WHERE id = $4';
    const values = [name, price, rating, id];
    pool.query(sql, values)
    .then(() => {
    res.redirect('/dashboard'); // Redirect to dashboard after successful update
    })
    .catch(err => {
    console.error('Failed to update data in PostgreSQL:', err);
    res.status(500).send('Internal Server Error');
    });
    });
    
    // Create a route for deleting a product (DELETE operation)
    app.post('/dashboard/delete/:id', authenticate, (req, res) => {
    // Extract data from URL parameter
    const { id } = req.params;
    
    // Delete product from the PostgreSQL database
    const sql = 'DELETE FROM products WHERE id = $1';
    const values = [id];
    pool.query(sql, values)
    .then(() => {
    res.redirect('/dashboard'); // Redirect to dashboard after successful deletion
    })
    .catch(err => {
    console.error('Failed to delete data from PostgreSQL:', err);
    res.status(500).send('Internal Server Error');
    });
    });

module.exports = router