require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const PosRoutes = require('./routes/PosRoutes');
const calculationRoutes = require('./routes/CalculationRoutes')
const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

app.use(express.json());
// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/Pos', PosRoutes);
app.use('/api/calc', calculationRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
