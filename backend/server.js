// Import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");

// Create app
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Create local SQLite database file
const db = new Database("messages.db");

// Create table if it does not exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at TEXT
  )
`).run();

// POST route - receive contact form data
app.post("/api/submitForm", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const stmt = db.prepare(`
    INSERT INTO messages (name, email, message, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `);
  stmt.run(name, email, message);

  console.log(`📩 New message from ${name} (${email}): ${message}`);
  res.json({ message: "Message received successfully ✅" });
});

// GET route - fetch all messages (for dashboard later)
app.get("/api/messages", (req, res) => {
  const rows = db.prepare("SELECT * FROM messages ORDER BY id DESC").all();
  res.json(rows);
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
