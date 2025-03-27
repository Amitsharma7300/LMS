import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from './controllers/webhooks.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Connect to MongoDB
connectDB().then(() => {
  app.use(express.json());
  app.use(cors());

  // Your routes and middleware here

  app.get('/', (req, res) => res.send("Api working"));
  app.post('/clerk', express.json(),clerkWebhooks)

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error(`Error connecting to the database: ${error}`); // 
});