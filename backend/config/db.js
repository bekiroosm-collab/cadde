const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined, if not, use a fallback for testing environments that might not read .env correctly immediately
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/halisaha');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
