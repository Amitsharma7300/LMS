import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import connectCloudinary from './configs/cloudinary.js';
import connectDB from "./configs/mongodb.js";
import { updateRoleToEducator } from './controllers/educatorController.js';
import { clerkWebhooks, StripeWebhooks } from './controllers/webhooks.js';
import courseRouter from './routes/courseRoute.js';
import educatorRouter from './routes/educatorRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config(); // Load environment variables from .env file

const app = express();


await connectCloudinary()
// Connect to MongoDB
connectDB().then(() => {
  app.use(express.json());
  app.use(cors());
  app.use(clerkMiddleware())

  // Your routes and middleware here

  app.get('/', (req, res) => res.send("Api working"));
  app.post('/clerk', express.json(),clerkWebhooks)
  app.use('/api/educator',express.json(),educatorRouter)
  app.post('/api/educator/update-role', updateRoleToEducator);
  app.use('/api/course',express.json(),courseRouter)
  app.use('/api/user',express.json(),userRouter)
app.post('/stripe',express.raw({type:'application/json'}),StripeWebhooks)
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error(`Error connecting to the database: ${error.message}`); // 
});