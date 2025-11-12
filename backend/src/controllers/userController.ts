import { User } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
 user?: {
sub: string;
 email: string;
  };
}
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

// backend/src/controllers/userController.ts

export async function addUser(req: AuthenticatedRequest, res: Response) {
  const { email } = req.body; // Email på användaren som ska läggas till
  const currentUserId = req.user?.sub; // Från JWT token (auth middleware)


  try {
    // Hitta användaren som ska läggas till via email
    const userToAdd = await User.findOne({ email });
    
    if (!userToAdd) {
      return res.status(404).json({ message: "User not found with that email" });
    }

    // Kolla så man inte lägger till sig själv
    if (userToAdd._id.toString() === currentUserId) {
      return res.status(400).json({ message: "You cannot add yourself as a friend" });
    }

    // Hitta den inloggade användaren
    const currentUser = await User.findById(currentUserId);
    
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    // Kolla om användaren redan är vän
    if (currentUser.friends.includes(userToAdd._id)) {
      return res.status(400).json({ message: "User is already your friend" });
    }

    // Lägg till vänförfrågan
    if (!userToAdd.friendRequests.includes(currentUser._id)) {
      userToAdd.friendRequests.push(currentUser._id);
      await userToAdd.save();
    }

    return res.status(200).json({ 
      message: "Friend request sent successfully",
      user: {
        _id: userToAdd._id,
        username: userToAdd.username,
        email: userToAdd.email
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      error, 
      message: "Internal server error adding user" 
    });
  }
}

// Funktion för att acceptera vänförfrågan
export async function acceptFriendRequest(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.body; // ID på användaren som skickade förfrågan
  const currentUserId = req.user?.sub;

  try {
    const currentUser = await User.findById(currentUserId);
    const friendUser = await User.findById(userId);

    if (!currentUser || !friendUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ta bort från friendRequests
    currentUser.friendRequests = currentUser.friendRequests.filter(
      id => id.toString() !== userId
    );

    // Lägg till i friends för båda användarna
    if (!currentUser.friends.includes(friendUser._id)) {
      currentUser.friends.push(friendUser._id);
    }
    if (!friendUser.friends.includes(currentUser._id)) {
      friendUser.friends.push(currentUser._id);
    }

    await currentUser.save();
    await friendUser.save();

    return res.status(200).json({ 
      message: "Friend request accepted",
      friend: {
        _id: friendUser._id,
        username: friendUser.username,
        email: friendUser.email
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      error, 
      message: "Internal server error accepting friend request" 
    });
  }
}

// Hämta alla vänner
export async function getFriends(req: AuthenticatedRequest, res: Response) {
  const currentUserId = req.user?.sub;

  try {
    const user = await User.findById(currentUserId)
      .populate('friends', 'username email'); // Populera med username och email

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ friends: user.friends });
  } catch (error) {
    return res.status(500).json({ 
      error, 
      message: "Internal server error getting friends" 
    });
  }
}

// Hämta alla väntande vänförfrågningar
export async function getFriendRequests(req: AuthenticatedRequest, res: Response) {
  const currentUserId = req.user?.sub;

  try {
    const user = await User.findById(currentUserId)
      .populate('friendRequests', 'username email');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ friendRequests: user.friendRequests });
  } catch (error) {
    return res.status(500).json({ 
      error, 
      message: "Internal server error getting friend requests" 
    });
  }
}