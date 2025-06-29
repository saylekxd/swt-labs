import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { config, validateConfig } from './config';
import { logger } from './utils/logger';
import healthRoutes from './routes/health';
import estimateRoutes from './routes/estimate';
import blogRoutes from './routes/blog';

// Validate configuration
try {
  validateConfig();
} catch (error) {
  logger.error('Configuration error:', error);
  process.exit(1);
}

const app = express();

// Configure middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware for blog authentication
app.use(session({
  secret: config.blog.adminKey || 'default-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    origin: req.headers.origin,
    userAgent: req.headers['user-agent'],
    headers: req.headers,
    query: req.query,
    body: req.method === 'POST' ? req.body : undefined
  });
  next();
});

// Pre-flight requests
app.options('*', cors(config.cors));

// Basic root route for testing
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SWT Labs API is running',
    timestamp: new Date().toISOString(),
    apiBase: `${req.protocol}://${req.get('host')}`,
    endpoints: {
      health: '/api/health',
      estimate: '/api/estimate',
      blog: '/api/blog',
      blogAdmin: '/api/blog/admin'
    }
  });
});

// API discovery endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SWT Labs API',
    version: '1.0.0',
    apiBase: `${req.protocol}://${req.get('host')}/api`,
    endpoints: {
      health: '/api/health',
      estimate: '/api/estimate',
      blog: '/api/blog',
      blogAdmin: '/api/blog/admin'
    }
  });
});

// Routes
app.use('/api', healthRoutes);
app.use('/api', estimateRoutes);
app.use('/api/blog', blogRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Handle errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

// Start server
app.listen(config.port, () => {
  logger.info(`🚀 Server running on port ${config.port}`);
  logger.info(`📡 OpenAI API Key status: ${config.openai.apiKey ? '✅ Configured' : '❌ Missing'}`);
  logger.info(`🤖 Gemini API Key status: ${config.gemini.apiKey ? '✅ Configured' : '❌ Missing'}`);
  logger.info(`🔑 Blog Admin Key status: ${config.blog.adminKey ? '✅ Configured' : '❌ Missing'}`);
  logger.info(`📝 Blog endpoints available at: /api/blog`);
}); 