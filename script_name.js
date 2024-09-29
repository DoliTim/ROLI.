const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid'); // For generating unique user IDs

// Create a new database file called roli_users.db
let db = new sqlite3.Database('./roli_users.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the roli_users database.');

    // Create a table to store user info
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,  -- Unique user ID generated
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,  -- Store the hashed password
        amount_of_roli_tokens INTEGER DEFAULT 0,
        affiliate_link TEXT UNIQUE,
        affiliate_link_related_registrations INTEGER DEFAULT 0,
        subscription_package TEXT,
        deposit_number INTEGER DEFAULT 0
      )
    `, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      } else {
        console.log('Users table created or already exists.');
      }
    });
  }
});

// Function to create a new user
const createUser = (username, email, password, subscription_package) => {
  const id = uuidv4();  // Generate a unique user ID
  const affiliate_link = `https://roli.com/register?ref=${id}`;  // Generate affiliate link
  const deposit_number = 0;

  // Insert the new user into the database
  db.run(`
    INSERT INTO users (id, username, email, password, affiliate_link, subscription_package, deposit_number)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [id, username, email, password, affiliate_link, subscription_package, deposit_number], function (err) {
    if (err) {
      console.error('Error inserting user into database:', err.message);
    } else {
      console.log('User created successfully with ID:', id);
    }
  });
};

// Example of how to use the createUser function
createUser('john_doe', 'john@example.com', 'hashed_password123', 'VIP Member');

// Close the database connection when done
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
