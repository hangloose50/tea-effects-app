import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import recommendationsRouter from './routes/recommendations';
import blendsRouter from './routes/blends';
import teasRouter from './routes/teas';
import effectsRouter from './routes/effects';
import trackingRouter from './routes/tracking';
import ragRouter from './routes/rag';

// Import services for health check
import MistralClient from './services/ai/MistralClient';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARE
// ============================================

app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', async (req: Request, res: Response) => {
  try {
    const mistral = new MistralClient();
    const ollamaHealthy = await mistral.healthCheck();

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        ollama: ollamaHealthy ? 'healthy' : 'unhealthy'
      }
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// ============================================
// API ROUTES
// ============================================

app.use('/api/recommendations', recommendationsRouter);
app.use('/api/blends', blendsRouter);
app.use('/api/teas', teasRouter);
app.use('/api/effects', effectsRouter);
app.use('/api/tracking', trackingRouter);
app.use('/api/rag', ragRouter);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Tea Effects API',
    version: '1.0.0',
    description: 'AI-powered tea recommendation system with effects-based blending',
    endpoints: {
      health: '/health',
      recommendations: '/api/recommendations',
      blends: '/api/blends',
      teas: '/api/teas',
      effects: '/api/effects',
      tracking: '/api/tracking',
      rag: '/api/rag'
    }
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.url} not found`
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🍵 Tea Effects API Server                              ║
║                                                           ║
║   Port: ${PORT}                                             ║
║   Environment: ${process.env.NODE_ENV || 'development'}                                ║
║   Ollama URL: ${process.env.OLLAMA_URL || 'http://localhost:11434'}        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
