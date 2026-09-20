import mongoose from 'mongoose';

/**
 * MongoDB connection handler with in-memory fallback for zero-config local testing.
 */
let isMockDbActive = false;

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_resume_analyzer';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[DATABASE WARNING] MongoDB unavailable (${error.message}). Activating In-Memory Storage Driver.`);
    isMockDbActive = true;
    return null;
  }
};

export const checkIsMockDb = () => isMockDbActive;
