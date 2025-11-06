import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db";

import userRoutes from "./routes/userRoutes";
import entryRoutes from "./routes/entryRoutes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", entryRoutes);

app.get("/", (_req, res) => {
  res.send("Node.js and Express.js with TypeScript");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB().catch(console.error);
