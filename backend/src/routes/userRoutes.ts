import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users", getUserById);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);

export default router;
