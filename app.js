import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnectivity } from "./config/db.js";
import userRouter from "./routes/adminRoute.js";
import { ProfileRouter } from "./routes/profileRoute.js";
const app=express();app.use(bodyParser.json());app.use(bodyParser.urlencoded({extended:!0}));app.use(express.json());app.use(cors());dotenv.config({path:"config/config.env"});const PORT=process.env.PORT||3011;dbConnectivity();app.use("/api/v1/user",userRouter);app.use("/api/v1/profile",ProfileRouter);app.listen(PORT,()=>{console.log(`Server is working on http://localhost:${PORT}`)})