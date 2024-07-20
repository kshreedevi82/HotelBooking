
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});
app.get('/book', (req, res) => {
  res.sendFile(path.join(__dirname, 'booking.html'));
});
// Database configuration
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotel'
});

conn.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Handle form submission
app.post('/submitcontact', (req, res) => {
    const { name, email, phone, message } = req.body;

    const sql = 'INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)';
    const values = [name, email, phone, message];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).send('Server Error');
            return;
        }
        console.log('Record inserted: ' + result.affectedRows);
        res.send('Form submitted successfully!');
    });
});

// Handle form submission
app.post('/submitbook', (req, res) => {
  const { name, email, phone, date,time,room } = req.body;

  const sql = 'INSERT INTO booking (name, email, phone, date,time,room) VALUES (?, ?, ?, ?,?,?)';
  const values = [name, email, phone, date,time,room];

  conn.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error inserting data: ', err);
          res.status(500).send('Server Error');
          return;
      }
      console.log('Record inserted: ' + result.affectedRows);
      res.send('Form submitted successfully!');
  });
});
// Start the server
app.listen(3306, () => {
    console.log('Server running on http://localhost:3306');
});