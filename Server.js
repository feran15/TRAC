require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const PosRoutes = require('./routes/PosRoutes');
const calculationRoutes = require('./routes/CalculationRoutes')
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/Pos', PosRoutes);
app.use('/api/calc', calculationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
