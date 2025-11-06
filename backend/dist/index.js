"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const entryRoutes_1 = __importDefault(require("./routes/entryRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", userRoutes_1.default);
app.use("/api", entryRoutes_1.default);
app.get("/", (_req, res) => {
    res.send("Node.js and Express.js with TypeScript");
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
(0, db_1.connectDB)().catch(console.error);
