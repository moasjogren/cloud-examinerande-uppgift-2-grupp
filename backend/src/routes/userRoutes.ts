import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController";

import { validateUserId } from "../middleware/validateId";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users/:id", validateUserId, getUserById);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
