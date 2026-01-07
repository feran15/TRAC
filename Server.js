require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const PosRoutes = require('./routes/PosRoutes');
const calculationRoutes = require('./routes/CalculationRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
app.use(express.json());

// Basic Content Security Policy to allow dev tools and local connections
app.use((req, res, next) => {
  // Allow same-origin scripts, and allow connecting back to localhost (APIs and extensions)
  res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:5000 ws: wss:; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';");
  next();
});

// Health / root route
app.get('/', (req, res) => {
  res.json({ status: 'TRAC API', message: 'Welcome — use /api/* endpoints or /api/docs for Swagger UI' });
});

// Provide an empty response for Chrome DevTools well-known request to avoid CSP/connect errors in the console
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(200).json({});
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/Pos', PosRoutes);
app.use('/api/calc', calculationRoutes);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
