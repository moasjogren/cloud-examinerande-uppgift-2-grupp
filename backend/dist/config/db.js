"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    if (!process.env.MONGODB_URI)
        throw new Error("Missing MONGODB_URI");
    await mongoose_1.default.connect(process.env.MONGODB_URI, {
        dbName: "Daybouk",
    });
    console.log("MongoDB connected");
}
