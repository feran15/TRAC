const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TRAC Transaction Tracker API',
      version: '1.0.0',
      description: 'API for tracking transactions and managing POS accounts (built with Node.js, Express, and MongoDB)'
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local server' }
    ],
  },
  apis: ['./routes/*.js', './Controllers/*.js'], // files containing annotations as above
};

module.exports = swaggerJsdoc(options);
