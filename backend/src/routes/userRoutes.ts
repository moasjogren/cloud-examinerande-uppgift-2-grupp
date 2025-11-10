import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
  logoutUser
} from "../controllers/userController";
import authUser from '../middleware/authentication';

import { validateUserId } from "../middleware/validateId";
import { validateUser, validateUpdatedUser } from "../middleware/validateUser";

const router = express.Router();

router.get("/users", authUser, getAllUsers);
router.post("/users/login", loginUser);
router.post("/users/logout", logoutUser);
router.post("/users",  validateUser, createUser);
router.get("/users/:id", authUser, validateUserId, getUserById);
router.patch("/users/:id", authUser, validateUserId, validateUpdatedUser, updateUser);
router.delete("/users/:id", authUser, validateUserId, deleteUser);

export default router;
