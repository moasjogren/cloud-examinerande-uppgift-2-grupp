"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEntries = getAllEntries;
exports.getEntryById = getEntryById;
exports.createEntry = createEntry;
exports.updateEntry = updateEntry;
exports.deleteEntry = deleteEntry;
const entryModel_1 = require("../models/entryModel");
async function getAllEntries(_req, res) {
    try {
        const entries = await entryModel_1.Entry.find();
        if (entries.length === 0)
            return res.status(200).send("No entries found");
        return res.status(200).json(entries);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error getting entries" });
    }
}
async function getEntryById(req, res) {
    const { id } = req.body;
    try {
        const entry = await entryModel_1.Entry.findById(id);
        return res.status(200).json(entry);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error getting entry" });
    }
}
async function createEntry(req, res) {
    const { title, content, tags, userId } = req.body;
    try {
        const entry = await entryModel_1.Entry.create({ title, content, tags, userId });
        if (!entry)
            return res.status(400).send("Could not create entry");
        return res.status(201).json({ message: "Entry created", entry });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error getting entries" });
    }
}
async function updateEntry(req, res) {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const input = { title, content, tags };
    try {
        const updatedEntry = await entryModel_1.Entry.findByIdAndUpdate(id, input, {
            new: true,
        });
        return res.status(200).json(updatedEntry);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error updating entries" });
    }
}
async function deleteEntry(req, res) {
    const { id } = req.params;
    try {
        const deletedEntry = await entryModel_1.Entry.findByIdAndDelete(id);
        return res.status(200).json(deletedEntry);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error, message: "Internal server error updating entries" });
    }
}
