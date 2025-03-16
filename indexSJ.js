const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const authRoutes = require('./routesAUTH');  // Move this up before routes

app.use('/api/auth', authRoutes);  // Ensure this is before app.listen

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Skill & Job Portal!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});