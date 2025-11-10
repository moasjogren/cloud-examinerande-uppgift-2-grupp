import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";

import userRoutes from "./routes/userRoutes";
import entryRoutes from "./routes/entryRoutes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", entryRoutes);

app.get("/", (_req, res) => {
  res.send("Node.js and Express.js with TypeScript");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB().catch(console.error);
