import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in the server directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('Current directory:', __dirname);
console.log('MongoDB URI from .env:', process.env.MONGODB_URI ? '*** URI FOUND ***' : '❌ URI NOT FOUND');

const testConnection = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Successfully connected to MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

testConnection();