import { User } from "../models/userModel";
import { Request, Response } from "express";

export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await User.find().lean();
    if (users.length === 0) res.status(404).send("No users found");

    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error getting users" });
  }
}

export async function createUser(req: Request, res: Response) {
  const { email, password, username } = req.body;
  try {
    const createdUser = await User.create({ username, email, password });

    if (!createdUser) res.status(400).send("Could not create user");
    return res.status(201).json({ message: "User created", createUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error creating user" });
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) res.status(404).send("Could not find user with that id");
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error finding user" });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(data);
    if (!updatedUser) res.status(400).send("Could not update user");

    res.status(200).json({ message: "User updated", updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error updating user" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) res.status(400).send("Could not find user to delete");
    return res.status(200).json({ message: "User deleted", deleteUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error deleting user" });
  }
}
