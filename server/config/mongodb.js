import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

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

  let retries = 0;
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds

  while (retries < maxRetries) {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log(`🌱 Connected to MongoDB at ${mongoose.connection.host}`);
      return;
    } catch (error) {
      retries++;
      console.error(`❌ Failed to connect to MongoDB (retry ${retries}/${maxRetries}):`, error.message);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }

  console.error('❌ Failed to connect to MongoDB after retries');
  process.exit(1);
};

export default connectDB;