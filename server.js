// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Use bcrypt for password hashing

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite DB
const db = new sqlite3.Database('./roli_users.db', (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a new table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  referralCode TEXT,
  amount_of_roli_tokens INTEGER DEFAULT 0
)`);

// Register user API
app.post('/register', async (req, res) => {
  const { username, email, password, referralCode } = req.body;

  // Check if the username or email already exists
  db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], async (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (row) {
      if (row.email === email) {
        return res.status(400).json({ message: 'Email is already in use.' });
      }
      if (row.username === username) {
        return res.status(400).json({ message: 'Username is already in use.' });
      }
    }

    try {
      // Hash password before saving to DB
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      db.run(
        `INSERT INTO users (username, email, password, referralCode, amount_of_roli_tokens) VALUES (?, ?, ?, ?, ?)`,
        [username, email, hashedPassword, referralCode || null, 0], // New user starts with 0 Roli tokens
        function (err) {
          if (err) {
            console.error('Registration failed:', err);
            return res.status(500).json({ message: 'Registration failed.' });
          }

          console.log(`New user created with ID: ${this.lastID}`);
          return res.status(200).json({ message: 'User registered successfully!', userId: this.lastID });
        }
      );
    } catch (error) {
      console.error('Password hashing failed:', error);
      return res.status(500).json({ message: 'Password hashing failed.' });
    }
  });
});

// Sign-in user API
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (!row) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, row.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    // Successful login
    console.log('User logged in:', row.username);
    res.status(200).json({ message: 'Login successful!', user: { id: row.id, username: row.username, amount_of_roli_tokens: row.amount_of_roli_tokens } });
  });
});

// Fetch user's Roli tokens by user ID
app.get('/user/:id/roli-tokens', (req, res) => {
  const userId = req.params.id;

  // Fetch the user's Roli tokens from the database
  db.get('SELECT amount_of_roli_tokens FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (!row) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return the user's Roli tokens
    res.status(200).json({ amount_of_roli_tokens: row.amount_of_roli_tokens });
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
// Admin Routes for Managing Users and Tokens

// Get list of all users
app.get('/admin/users', (req, res) => {
  db.all('SELECT id, username, email, amount_of_roli_tokens FROM users', [], (err, rows) => {
    if (err) {
      console.error('Failed to fetch users:', err);
      return res.status(500).json({ message: 'Failed to fetch users.' });
    }
    return res.status(200).json({ users: rows });
  });
});

// Adjust token balance for a user
app.put('/admin/user/:id/tokens', (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  db.run(
    'UPDATE users SET amount_of_roli_tokens = ? WHERE id = ?',
    [amount, id],
    function (err) {
      if (err) {
        console.error('Failed to update tokens:', err);
        return res.status(500).json({ message: 'Failed to update tokens.' });
      }
      return res.status(200).json({ message: 'Token balance updated successfully!' });
    }
  );
});

// Get system statistics (user count, total tokens distributed)
app.get('/admin/stats', (req, res) => {
  db.get(
    'SELECT COUNT(*) as userCount, SUM(amount_of_roli_tokens) as totalTokens FROM users',
    (err, row) => {
      if (err) {
        console.error('Failed to fetch stats:', err);
        return res.status(500).json({ message: 'Failed to fetch stats.' });
      }
      return res.status(200).json(row);
    }
  );
});
// server.js

// Increment Roli tokens when a task (app engagement) is completed
app.post('/engagement/:userId', (req, res) => {
  const { userId } = req.params;
  const { reward } = req.body; // Token reward for each click

  // Increment the user's token count in the database
  db.run(
    `UPDATE users SET amount_of_roli_tokens = amount_of_roli_tokens + ? WHERE id = ?`,
    [reward, userId],
    function (err) {
      if (err) {
        console.error('Error updating tokens:', err);
        return res.status(500).json({ message: 'Failed to update tokens.' });
      }

      // Retrieve the updated token count
      db.get(`SELECT amount_of_roli_tokens FROM users WHERE id = ?`, [userId], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to retrieve updated tokens.' });
        }

        return res.status(200).json({
          message: `Successfully added ${reward} tokens.`,
          amount_of_roli_tokens: row.amount_of_roli_tokens,
        });
      });
    }
  );
});
