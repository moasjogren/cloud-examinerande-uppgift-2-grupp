"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validateId_1 = require("../middleware/validateId");
const router = express_1.default.Router();
router.get("/users", userController_1.getAllUsers);
router.post("/users", userController_1.createUser);
router.get("/users/:id", validateId_1.validateUserId, userController_1.getUserById);
router.patch("/users/:id", userController_1.updateUser);
router.delete("/users/:id", userController_1.deleteUser);
exports.default = router;
