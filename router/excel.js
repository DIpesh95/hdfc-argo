// Import the ExcelJS library
const express = require('express');
const excel = require('exceljs');
const router = express.Router()
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Update with your database host
  user: 'root', // Update with your database username
  password: 'password', // Update with your database password
  database: 'mydb' // Update with your database name
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server!');
});

// Load the Excel workbook
const workbook = new excel.Workbook();
workbook.xlsx.readFile('data.xlsx') // Update with the path to your Excel file
  .then(() => {
    // Get the worksheet
    const worksheet = workbook.getWorksheet(1); // Update with the index of your worksheet (starts from 1)

    // Iterate through each row in the worksheet
    worksheet.eachRow((row, rowNumber) => {
      // Skip the header row (if needed)
      if (rowNumber === 1) return;

      // Extract data from the row
      const name = row.getCell(1).value;
      const age = row.getCell(2).value;
      const city = row.getCell(3).value;

      // Save the data in the SQL database
      const sql = 'INSERT INTO users (name, age, city) VALUES (?, ?, ?)';
      const values = [name, age, city];
      connection.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log(`Inserted row ${rowNumber - 1} with ID: ${result.insertId}`);
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
