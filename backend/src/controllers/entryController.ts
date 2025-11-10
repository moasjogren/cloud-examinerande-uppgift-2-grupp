import { Entry } from "../models/entryModel";
import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function getAllEntries(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const entries = await Entry.find({ userId });

    if (entries.length === 0) return res.status(200).json([]);

    return res.status(200).json(entries);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error getting entries" });
  }
}

export async function getEntryById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const entry = await Entry.findById(id);

    return res.status(200).json(entry);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error getting entry" });
  }
}

export async function getAllEntriesByUser(
  req: AuthenticatedRequest,
  res: Response
) {
  const { id } = req.params;

  try {
    const requesterId = req.user?.id;

    if (!requesterId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (requesterId !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const entries = await Entry.find({ userId: id });

    if (entries.length === 0) return res.status(200).json([]);

    return res.status(200).json(entries);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal server error getting entries" });
  }
}

export async function createEntry(req: AuthenticatedRequest, res: Response) {
  const { title, content, tags } = req.body;
  const userId = req.user?.id;

  try {
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const normalizedTags = Array.isArray(tags) ? tags : [];

    const entry = await Entry.create({
      title,
      content,
      tags: normalizedTags,
      userId,
    });

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
      .json({ error, message: "Internal server error updating entry" });
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
      .json({ error, message: "Internal server error deleting entry" });
  }
}
