// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./roli.db');

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      roli_tokens INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;
