const express = require('express');
const pool = require('./configdb');
const authenticateToken = require('./middleware/authMiddleware');  // protects the route
const router = express.Router();

// ✅ GET /api/skill/problems – Get all problems
router.get('/problems', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM problems ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching problems:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ POST /api/skill/solve – Solve a problem and earn coins
router.post('/solve', authenticateToken, async (req, res) => {
    const { problem_id } = req.body;
    const user_id = req.user.userId;

    if (!problem_id) {
        return res.status(400).json({ error: "Problem ID is required" });
    }

    try {
        // Simulate reward logic (e.g., 5 coins per solve)
        const coinsEarned = 5;

        // Update progress
        await pool.query(
            `INSERT INTO user_progress (user_id, problem_id, is_solved, solved_at, coins_earned)
             VALUES ($1, $2, TRUE, CURRENT_TIMESTAMP, $3)`,
            [user_id, problem_id, coinsEarned]
        );

        res.status(200).json({ message: "Problem solved successfully", coinsEarned });
    } catch (error) {
        console.error("Error solving problem:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
