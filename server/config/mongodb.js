import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connection events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('ℹ️ MongoDB disconnected');
});

// Close the connection when the Node process ends
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('ℹ️ MongoDB connection closed through app termination');
  process.exit(0);
});

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Using existing database connection');
    return;
  }

  try {
    // Get the base URI from environment variables
    let mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    // Trim and ensure proper formatting
    mongoUri = mongoUri.trim();
    
    // If the URI already contains a database name, use it as-is
    if (mongoUri.includes('mongodb://') || mongoUri.includes('mongodb+srv://')) {
      console.log('Connecting to MongoDB with URI:', mongoUri.replace(/:([^:]*?)@/, ':***@'));
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    } else {
      throw new Error('Invalid MongoDB connection string format');
    }
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;