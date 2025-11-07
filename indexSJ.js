// Import required packages
const express = require('express'); // Express framework for routing and middleware
const bcrypt = require('bcryptjs'); // For securely comparing hashed passwords
const jwt = require('jsonwebtoken'); // For creating authentication tokens
const pool = require('./configdb'); // Your PostgreSQL database connection pool
require('dotenv').config(); // Loads environment variables from .env file

// Create a new Express router instance
const router = express.Router();

/**
 * @route POST /login
 * @desc Authenticates a user based on email & password
 * @access Public (anyone can call this route)
 */
router.post('/login', async (req, res) => {
  try {
    // 1️⃣ Extract 'email' and 'password' fields from the request body
    const { email, password } = req.body;

    // 2️⃣ Validate input — both email and password must be provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // 3️⃣ Query the database for a user with the given email
    // $1 is a parameterized query placeholder to prevent SQL injection
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // 4️⃣ If no user is found, return an error (invalid email)
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 5️⃣ Extract the first (and only) matching user record
    const user = result.rows[0];

    // 6️⃣ Compare the entered password with the hashed password stored in DB
    // bcrypt.compare() automatically handles hash + salt verification
    const validPassword = await bcrypt.compare(password, user.password);

    // 7️⃣ If password doesn’t match, return an error
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 8️⃣ Create a signed JWT (JSON Web Token) for session authentication
    // The token payload contains user info (ID, email, role)
    // The secret key is read from the environment variable JWT_SECRET
    // The token will expire in 1 hour
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 9️⃣ Send success response to the client
    // Include a message, token, and minimal user info (no password)
    return res.json({
      message: "Login successful",
      token,
      user: { id: user.id, role: user.role, email: user.email }
    });

  } catch (err) {
    // 🔟 If anything goes wrong, catch it and log the error
    console.error("🔥 Login Error:", err);

    // Send a generic 500 Internal Server Error response
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Export this router so it can be used in your main server file (app.js)
module.exports = router;
