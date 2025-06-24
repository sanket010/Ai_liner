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

// Store the static path for health check
let staticPath = null;

// Serve static files from the React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Define all possible static file locations
  const possiblePaths = [
    path.join(__dirname, 'public'),           // Primary location (server/public)
    path.join(process.cwd(), 'public'),      // Root public directory
    path.join(__dirname, 'dist'),             // Fallback dist location
    path.join(process.cwd(), 'dist'),         // Root dist directory
    path.join(__dirname, '../client/dist')    // Client build directory
  ];

  // Log all possible paths for debugging
  console.log('\n=== Checking for static files in the following locations ===');
  possiblePaths.forEach((p, i) => console.log(`${i + 1}. ${p}`));
  console.log('==========================================================\n');

  // Find the first valid path that contains index.html
  staticPath = possiblePaths.find(p => {
    try {
      const indexPath = path.join(p, 'index.html');
      fs.accessSync(indexPath, fs.constants.F_OK);
      console.log(`✓ Found static files at: ${p}`);
      
      // Log directory contents for verification
      try {
        const files = fs.readdirSync(p);
        console.log(`Directory contents (${p}):`, files);
        if (files.includes('assets')) {
          const assets = fs.readdirSync(path.join(p, 'assets'));
          console.log('Assets found:', assets);
        }
      } catch (e) {
        console.error(`Error reading directory ${p}:`, e.message);
      }
      
      return true;
    } catch (e) {
      console.log(`✗ Not found at: ${p}`);
      return false;
    }
  });

  if (staticPath) {
    console.log(`\n=== Serving static files from: ${staticPath} ===\n`);
    app.use(express.static(staticPath));
    // Store the static path in the app for health check
    app.set('staticPath', staticPath);
  } else {
    console.error('\n=== ERROR: Could not find client build directory ===');
    console.error('Searched in:', possiblePaths);
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
  const currentStaticPath = app.get('staticPath') || 'Not found';
  
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    buildPath: currentStaticPath,
    env: process.env.NODE_ENV || 'development',
    cwd: process.cwd(),
    __dirname: __dirname
  });
});

// Handle SPA fallback - return the main index.html file for any unknown routes
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    if (staticPath) {
      const indexPath = path.join(staticPath, 'index.html');
      console.log(`Serving index.html from: ${indexPath}`);
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ 
        error: 'Frontend build not found',
        possiblePaths: [
          path.join(__dirname, 'public'),
          path.join(process.cwd(), 'public'),
          path.join(__dirname, 'dist'),
          path.join(process.cwd(), 'dist'),
          path.join(__dirname, '../client/dist')
        ],
        currentDir: process.cwd(),
        __dirname: __dirname
      });
    }
  });
} else {
  // Only in development
  app.get('/', (req, res) => {
    res.json({ 
      message: 'API Working',
      env: process.env.NODE_ENV || 'development',
      cwd: process.cwd(),
      __dirname: __dirname
    });
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
