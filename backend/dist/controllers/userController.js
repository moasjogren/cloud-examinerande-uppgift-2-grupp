"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const userModel_1 = require("../models/userModel");
async function getAllUsers(_req, res) {
    try {
        const users = await userModel_1.User.find().lean();
        if (users.length === 0)
            return res.status(200).send("No users found");
        return res.status(200).json({ users });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error getting users" });
    }
}
async function createUser(req, res) {
    const { email, password, username } = req.body;
    try {
        console.log(req.body);
        const createdUser = await userModel_1.User.create({ username, email, password });
        if (!createdUser)
            return res.status(400).send("Could not create user");
        return res.status(201).json({ message: "User created", createdUser });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error creating user" });
    }
}
async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await userModel_1.User.findById(id);
        if (!user)
            res.status(404).send("Could not find user with that id");
        return res.status(200).json({ message: "User found", user });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error finding user" });
    }
}
async function updateUser(req, res) {
    const { id } = req.params;
    const { data } = req.body;
    try {
        const updatedUser = await userModel_1.User.findByIdAndUpdate(id, data, { new: true });
        if (!updatedUser)
            return res.status(400).send("Could not update user");
        res.status(200).json({ message: "User updated", updatedUser });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error updating user" });
    }
}
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const deletedUser = await userModel_1.User.findByIdAndDelete(id);
        if (!deletedUser)
            return res.status(400).send("Could not find user to delete");
        return res.status(200).json({ message: "User deleted", deletedUser });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error deleting user" });
    }
}
