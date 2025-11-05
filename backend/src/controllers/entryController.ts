import { Entry } from "../models/entryModel";
import { Request, Response } from "express";

export async function getAllEntries(_req: Request, res: Response) {
  try {
    const entries = await Entry.find();
    if (entries.length === 0) return res.status(200).send("No entries found");
    return res.status(200).json(entries);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error getting entries" });
  }
}
export async function getEntryById(req: Request, res: Response) {
  const { id } = req.body;

  try {
    const entry = Entry.findById(id);
  } catch (error) {}
}

export async function createEntry() {}

export async function deleteEntry() {}

export async function updateEntry() {}
