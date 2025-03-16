const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy database (Replace with actual DB integration)
const users = [];

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user (Replace with actual DB insertion)
        const newUser = { username, email, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
