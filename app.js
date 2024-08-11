import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnectivity } from "./config/db.js";
import userRouter from "./routes/adminRoute.js";
import { ProfileRouter } from "./routes/profileRoute.js";

const app = express();

// Middlewares

// Middleware to serve static files
app.use("/uploads", express.static("uploads")); // Serve static files from the uploads folder

app.use(express.json());
app.use(cors());
// dotenv config
dotenv.config({ path: "config/config.env" });

const PORT = process.env.PORT || 3011;

dbConnectivity();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/profile", ProfileRouter);

app.listen(PORT, () => {
  console.log(`Server is workin on http://localhost:${PORT}`);
});
