const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/save', (req, res) => {
  const data = {
    variable: req.body.variable
  };

  connection.query('INSERT INTO variables SET ?', data, (err, result) => {
    if (err) {
      console.error('Error saving variable: ' + err.stack);
      res.sendStatus(500);
      return;
    }
    console.log('Variable saved: ' + req.body.variable);
    res.sendStatus(200);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
