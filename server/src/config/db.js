import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_resume_analyzer';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[DATABASE ERROR] MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};