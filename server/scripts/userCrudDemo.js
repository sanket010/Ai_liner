import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/mongodb.js';
import User from '../models/User.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Sample user data
const sampleUser = {
  name: 'Test User',
  email: `test${Math.floor(Math.random() * 10000)}@example.com`,
  password: 'password123',
  role: 'user'
};

// Connect to MongoDB
await connectDB();

// Helper function to clear the console
const clearConsole = () => console.clear();

// Create a new user
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log('✅ User created successfully');
    return user;
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    throw error;
  }
};

// Find user by ID
const findUserById = async (id) => {
  try {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('User not found');
    console.log('✅ User found:', user);
    return user;
  } catch (error) {
    console.error('❌ Error finding user:', error.message);
    throw error;
  }
};

// Update user
const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');
    if (!user) throw new Error('User not found');
    console.log('✅ User updated successfully:', user);
    return user;
  } catch (error) {
    console.error('❌ Error updating user:', error.message);
    throw error;
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    console.log('✅ User deleted successfully');
    return user;
  } catch (error) {
    console.error('❌ Error deleting user:', error.message);
    throw error;
  }
};

// List all users
const listUsers = async () => {
  try {
    const users = await User.find({}).select('-password');
    console.log(`📋 Found ${users.length} users:`);
    console.table(users);
    return users;
  } catch (error) {
    console.error('❌ Error listing users:', error.message);
    throw error;
  }
};

// Main function to demonstrate CRUD operations
const demoCRUD = async () => {
  try {
    clearConsole();
    console.log('🚀 Starting MongoDB CRUD Demo\n');

    // 1. Create a new user
    console.log('1. Creating a new user...');
    const newUser = await createUser(sampleUser);
    
    // 2. Find the created user
    console.log('\n2. Finding the created user...');
    const foundUser = await findUserById(newUser._id);
    
    // 3. Update the user
    console.log('\n3. Updating the user...');
    const updatedUser = await updateUser(newUser._id, { 
      name: 'Updated Test User' 
    });
    
    // 4. List all users
    console.log('\n4. Listing all users...');
    await listUsers();
    
    // 5. Delete the user
    console.log('\n5. Deleting the user...');
    await deleteUser(newUser._id);
    
    // 6. Verify deletion
    console.log('\n6. Verifying deletion...');
    try {
      await findUserById(newUser._id);
    } catch (error) {
      console.log('✅ User successfully deleted');
    }
    
    console.log('\n✨ CRUD Demo Completed Successfully!');
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
    process.exit(0);
  }
};

// Run the demo
demoCRUD();
