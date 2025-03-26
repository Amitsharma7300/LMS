import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database connected'));
    mongoose.connection.on('error', (err) => console.error(`Database connection error: ${err}`));
    await mongoose.connect(process.env.MONGODB_URI
    );
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    throw error; // Rethrow the error to be caught in server.js
  }
};

export default connectDB;