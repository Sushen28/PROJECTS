const express = require('express');
const dotenv = require('dotenv');
const skillRoutes = require('./routesSkill');


dotenv.config();

const app = express();
app.use(express.json());  // ✅ Ensures request body is parsed correctly

// Import authentication routes
const authRoutes = require('./routesAUTH');  
app.use('/api/auth', authRoutes);  // ✅ Ensures /signup and /login are available
app.use('/api/skill', skillRoutes);


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Skill & Job Portal!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
