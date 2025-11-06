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
    const entry = await Entry.findById(id);

    return res.status(200).json(entry);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error getting entry" });
  }
}

export async function createEntry(req: Request, res: Response) {
  const { title, content, tags, userId } = req.body;

  try {
    const entry = await Entry.create({ title, content, tags, userId });

    if (!entry) return res.status(400).send("Could not create entry");

    return res.status(201).json({ message: "Entry created", entry });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error getting entries" });
  }
}

export async function updateEntry(req: Request, res: Response) {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  const input: any = { title, content, tags };

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, input, {
      new: true,
    });

    return res.status(200).json(updatedEntry);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error updating entries" });
  }
}

export async function deleteEntry(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedEntry = await Entry.findByIdAndDelete(id);

    return res.status(200).json(deletedEntry);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error updating entries" });
  }
}
