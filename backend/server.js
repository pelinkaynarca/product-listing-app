const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const productRoutes = require('./src/controllers/ProductController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Product Listing API is running!',
    version: '1.0.0',
    endpoints: ['/api/products']
  });
});

// API Routes
app.use('/api', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/products`);
});