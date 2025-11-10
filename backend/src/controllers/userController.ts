import { User } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await User.find();
    if (users.length === 0) return res.status(200).send("No users found");

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
    // Hasha lösenordet INNAN du skapar användaren
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa användaren med det hashade lösenordet
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!createdUser) return res.status(400).send("Could not create user");

    return res.status(201).json({
      message: "User created",
      createdUser,
    });
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
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) return res.status(400).send("Could not update user");

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
    if (!deletedUser)
      return res.status(400).send("Could not find user to delete");
    return res.status(200).json({ message: "User deleted", deletedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error deleting user" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    // Hitta användaren via email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Jämför lösenordet med det hashade lösenordet
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {sub: user.id, email: user.email},
      process.env.JWT_SECRET as string,
      {expiresIn: "1h"}
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    })

    // Login lyckades - returnera användaren utan lösenord
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        token
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error during login" });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res
    .status(500)
    .json({ error, message: "Internal server error during logout" });
  }
   
}
