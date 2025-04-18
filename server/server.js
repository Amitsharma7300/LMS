import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webhooks.js"

const app=express()
await connectDB()

//middlewares
app.use(cors())

//routes
app.get('/',(req,res)=>res.send('api is running'))
app.post('/clerk',express.json(),clerkWebhooks)

//port

const PORT=process.env.PORT|| 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

