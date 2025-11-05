import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node.js and Express.js with TypeScript");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
