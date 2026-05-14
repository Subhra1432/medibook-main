const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/patients', require('./routes/patients'));

// API status
app.get('/api/status', (req, res) => {
  res.json({ message: 'MediBook API is running 🏥', version: '1.0.0' });
});

const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
const hasFrontendBuild = fs.existsSync(frontendDistPath);

if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/healthz') return next();
    return res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'MediBook API is running 🏥', version: '1.0.0' });
  });
}

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const IS_RENDER = Boolean(process.env.RENDER);
const MONGO_URI = process.env.MONGO_URI || (IS_RENDER ? '' : 'mongodb://127.0.0.1:27017/medibook');
const MONGO_RETRY_MS = Number(process.env.MONGO_RETRY_MS || 10000);

if (!MONGO_URI) {
  console.error('❌ Missing MONGO_URI environment variable. Set it in your Render service environment.');
  process.exit(1);
}

let mongoReady = false;

async function connectMongoWithRetry() {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    mongoReady = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    mongoReady = false;
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    console.error(`↻ Retrying MongoDB connection in ${MONGO_RETRY_MS}ms`);
    setTimeout(connectMongoWithRetry, MONGO_RETRY_MS);
  }
}

app.get('/healthz', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    mongo: mongoReady ? 'connected' : 'disconnected',
  });
});

// Error handler
app.use(require('./middleware/errorHandler'));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectMongoWithRetry();
});
