import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resume.js';
import historyRoutes from './routes/history.js';

dotenv.config();

if (!process.env.JWT_SECRET?.trim()) {
  throw new Error('JWT_SECRET must be configured before starting the server');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' },
});
app.use('/api', limiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/history', historyRoutes);

// Root / Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AI Resume Analyzer API',
    aiProvider: 'OpenAI (Isolated Backend)',
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    openAIConfigured: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim().length > 10),
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handler (No stack trace leaks)
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 AI Resume Analyzer API Server running on port ${PORT}`);
  console.log(`🤖 AI Provider: OpenAI (${process.env.OPENAI_MODEL || 'gpt-4o-mini'})`);
  console.log(`🔒 API Key status: ${process.env.OPENAI_API_KEY ? 'Configured on Backend' : 'Missing/Not set'}`);
  console.log(`====================================================`);
});
