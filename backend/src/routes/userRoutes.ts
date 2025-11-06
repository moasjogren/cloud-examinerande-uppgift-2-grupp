import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController";

import { validateUserId } from "../middleware/validateId";
import { validateUser, validateUpdatedUser } from "../middleware/validateUser";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", validateUser, createUser);
router.get("/users/:id", validateUserId, getUserById);
router.patch("/users/:id", validateUserId, validateUpdatedUser, updateUser);
router.delete("/users/:id", validateUserId, deleteUser);

export default router;
