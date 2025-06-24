import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in the project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Log environment variables (masking sensitive data)
const maskedMongoUri = process.env.MONGODB_URI 
  ? process.env.MONGODB_URI.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, '$1***:***@')
  : 'Not found';

console.log('Current directory:', __dirname);
console.log('MongoDB URI from .env:', maskedMongoUri);
console.log('Environment variables loaded from:', path.resolve(__dirname, '../.env'));

const testConnection = async () => {
  if (!process.env.MONGODB_URI) {
    console.error(' Error: MONGODB_URI is not defined in .env');
    console.log('Available environment variables:', Object.keys(process.env).join(', '));
    process.exit(1);
  }

  try {
    // Ensure the connection string is properly formatted
    let mongoUri = process.env.MONGODB_URI.trim();
    
    // Remove any trailing slashes
    mongoUri = mongoUri.replace(/\/+$/, '');
    
    // Check if the connection string already has a database name
    let connectionString = mongoUri;
    if (!mongoUri.includes('?')) {
      // If no query parameters, add the database name and default options
      connectionString = `${mongoUri}/imagify?retryWrites=true&w=majority`;
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', connectionString.replace(/:([^:]*?)@/, ':***@'));
    
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(' Successfully connected to MongoDB');
    
    // List all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nAvailable collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error(' Error connecting to MongoDB:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

testConnection();