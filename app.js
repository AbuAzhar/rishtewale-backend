import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnectivity } from "./config/db.js";
import userRouter from "./routes/adminRoute.js";
import { ProfileRouter } from "./routes/profileRoute.js";
dotenv.config({path:"config/config.env"});const app=express();app.use(express.json()),app.use(cors()),dbConnectivity(),app.use("/api/v1/user",userRouter),app.use("/api/v1/profile",ProfileRouter);const PORT=process.env.PORT||3011;app.listen(PORT,(()=>{console.log(`Server is running on http://localhost:${PORT}`)}));