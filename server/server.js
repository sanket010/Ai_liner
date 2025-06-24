import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import authRouter from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Try multiple possible paths for the static files
  const staticPaths = [
    path.join(__dirname, 'public'),          // New build location
    path.join(__dirname, 'dist'),            // Old location
    path.join(__dirname, '../dist'),         // Fallback location
    path.join(__dirname, '../client/dist'),  // Client build location
    path.join(process.cwd(), 'public'),      // Absolute path fallback
    path.join(process.cwd(), 'dist')         // Absolute path fallback 2
  ];
  
  const staticPath = staticPaths.find(p => {
    try {
      const indexPath = path.join(p, 'index.html');
      console.log(`Checking for index.html at: ${indexPath}`);
      fs.accessSync(indexPath, fs.constants.F_OK);
      console.log(`✓ Found static files at: ${p}`);
      return true;
    } catch (e) {
      console.log(`✗ Not found at: ${p}`);
      return false;
    }
  });
  
  if (staticPath) {
    console.log(`\n=== Serving static files from: ${staticPath} ===\n`);
    app.use(express.static(staticPath));
    
    // Log directory contents for debugging
    try {
      const files = fs.readdirSync(staticPath);
      console.log('Static files found:', files);
      if (files.includes('assets')) {
        const assets = fs.readdirSync(path.join(staticPath, 'assets'));
        console.log('Assets found:', assets);
      }
    } catch (e) {
      console.error('Error reading static files directory:', e);
    }
  } else {
    console.error('\n=== ERROR: Could not find client build directory ===');
    console.error('Searched in:', staticPaths);
    console.error('Current working directory:', process.cwd());
    console.error('__dirname:', __dirname);
    console.error('================================================\n');
  }
}

// Connect to MongoDB
await connectDB();

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const staticPath = process.env.NODE_ENV === 'production' ? 
    (app.get('staticPath') || 'development') : 'development';
    
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    buildPath: staticPath,
    env: process.env.NODE_ENV || 'development'
  });
});

// Handle SPA fallback - return the main index.html file for any unknown routes
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    const indexPath = [
      path.join(__dirname, 'public/index.html'),
      path.join(__dirname, 'dist/index.html'),
      path.join(__dirname, '../dist/index.html'),
      path.join(process.cwd(), 'public/index.html'),
      path.join(process.cwd(), 'dist/index.html')
    ].find(p => {
      try {
        fs.accessSync(p, fs.constants.F_OK);
        console.log(`Serving index.html from: ${p}`);
        return true;
      } catch (e) {
        console.log(`Could not find index.html at: ${p}`);
        return false;
      }
    });
    
    if (indexPath) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ 
        error: 'Frontend build not found',
        checkedPaths: [
          path.join(__dirname, 'public/index.html'),
          path.join(__dirname, 'dist/index.html'),
          path.join(__dirname, '../dist/index.html'),
          path.join(process.cwd(), 'public/index.html'),
          path.join(process.cwd(), 'dist/index.html')
        ],
        currentDir: process.cwd(),
        __dirname: __dirname
      });
    }
  });
} else {
  // Only in development
  app.get('/', (req, res) => {
    res.json({ message: 'API Working' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
