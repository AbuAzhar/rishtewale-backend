import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnectivity } from "./config/db.js";
import userRouter from "./routes/adminRoute.js";
import { ProfileRouter } from "./routes/profileRoute.js";
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://rishtewale.com/', // Allow requests from your frontend domain
// }));




// dotenv config
dotenv.config({ path: "config/config.env" });

const PORT = process.env.PORT || 3011;

dbConnectivity();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/profile", ProfileRouter);

app.listen(PORT, () => {
  console.log(`Server is workin on http://localhost:${PORT}`);
});
