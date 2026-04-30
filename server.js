import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`✗ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Exam-Hub API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes (to be implemented)
app.use('/api/auth', (req, res) => {
  res.status(501).json({ message: 'Auth routes coming soon' });
});

app.use('/api/exams', (req, res) => {
  res.status(501).json({ message: 'Exam routes coming soon' });
});

app.use('/api/questions', (req, res) => {
  res.status(501).json({ message: 'Question routes coming soon' });
});

app.use('/api/submissions', (req, res) => {
  res.status(501).json({ message: 'Submission routes coming soon' });
});

app.use('/api/analytics', (req, res) => {
  res.status(501).json({ message: 'Analytics routes coming soon' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot find ${req.method} ${req.path}`,
    timestamp: new Date().toISOString()
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n╔══════════════════��═════════════════════╗`);
  console.log(`║     EXAM-HUB SERVER STARTED              ║`);
  console.log(`╠════════════════════════════════════════╣`);
  console.log(`║ Server: http://localhost:${PORT}`);
  console.log(`║ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`║ Database: ${process.env.MONGODB_URI}`);
  console.log(`╚════════════════════════════════════════╝\n`);
});

export default app;
