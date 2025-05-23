const express = require('express');
const pool = require('./configdb');
const authenticateToken = require('./middleware/authMiddleware');
const router = express.Router();

// ✅ GET /api/jobs - Get all jobs
router.get('/', authenticateToken, async (req, res) => {
  try {
    const jobs = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(jobs.rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ POST /api/jobs/apply - Apply for a job
router.post('/apply', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { job_id } = req.body;

  if (!job_id) return res.status(400).json({ error: 'Job ID required' });

  try {
    // 1. Check if user has enough coins
    const userRes = await pool.query('SELECT coins FROM users WHERE id = $1', [userId]);
    const userCoins = userRes.rows[0]?.coins;

    const jobRes = await pool.query('SELECT coin_cost FROM jobs WHERE id = $1', [job_id]);
    const jobCost = jobRes.rows[0]?.coin_cost;

    if (userCoins === undefined || jobCost === undefined) {
      return res.status(400).json({ error: 'Invalid job or user' });
    }

    if (userCoins < jobCost) {
      return res.status(403).json({ error: 'Not enough coins to apply for this job' });
    }

    // 2. Deduct coins
    await pool.query('UPDATE users SET coins = coins - $1 WHERE id = $2', [jobCost, userId]);

    // 3. Insert into applications table
    await pool.query('INSERT INTO applications (user_id, job_id) VALUES ($1, $2)', [userId, job_id]);

    res.status(200).json({ message: 'Successfully applied to the job' });

  } catch (error) {
    console.error("Job apply error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET /api/jobs/applied - View applied jobs for the current user
router.get('/applied', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(`
      SELECT j.id, j.title, j.description
      FROM jobs j
      INNER JOIN applications a ON j.id = a.job_id
      WHERE a.user_id = $1
    `, [userId]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
