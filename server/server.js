import express from "express"
import "dotenv/config"
import cors from "cors";
import { connect } from "mongoose";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB()
connectCloudinary();
const app = express();
app.use(cors()) // enable cross origin resource sharing

// middelware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to clerk WebHooks
app.use("/api/clerk",clerkWebhooks)
app.use("/api/hotels",hotelRouter)
app.use("/api/rooms",roomRouter)
app.use("/api/bookings",bookingRouter)



app.get('/',(req,res)=> res.send("API is working"))
app.use('/api/user',userRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));

