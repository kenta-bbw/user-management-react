const mysql = require('mysql2');

// Replace these values with your actual database connection details
const dbConfig = {
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database: 'db-user-mgmt'
      };

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');

  // SQL statement to create the "users" table
  const createTableQuery = `
    CREATE TABLE users (
      id INT PRIMARY KEY,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      phone VARCHAR(15),
      email VARCHAR(255),
      country VARCHAR(255)
    );
  `;

  // Execute the SQL statement to create the table
  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully');
    }

    // Close the database connection
    connection.end();
  });
});
