import { Request, Response } from "express";
import { Entry } from "../models/entryModel";
import {
  generateEmbedding,
  calculateCosineSimilarity,
} from "../services/embedding";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function semanticSearch(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    const { query, tags, threshold = 0.5 } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const queryEmbedding = await generateEmbedding(query);

    let filter: any = { userId };

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      filter.tags = { $in: tagArray };
    }

    const entries = await Entry.find(filter).select("+embedding");

    const resultsWithScores = entries
      .filter((entry) => entry.embedding && entry.embedding.length > 0)
      .map((entry) => {
        const score = calculateCosineSimilarity(
          queryEmbedding,
          entry.embedding!
        );
        return { entry, score };
      });

    const relevantResults = resultsWithScores
      .filter((result) => result.score >= Number(threshold))
      .sort((a, b) => b.score - a.score)
      .map((result) => ({
        _id: result.entry._id,
        title: result.entry.title,
        content: result.entry.content,
        tags: result.entry.tags,
        userId: result.entry.userId,
        createdAt: result.entry.createdAt,
        updatedAt: result.entry.updatedAt,
        relevanceScore: Math.round(result.score * 100) / 100,
      }));

    return res.status(200).json(relevantResults);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during semantic searh",
    });
  }
}
export async function getAvailableTags(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const entries = await Entry.find({ userId });
    const allTags = entries.flatMap((entry) => entry.tags || []);
    const uniqueTags = [...new Set(allTags)].sort();

    return res.status(200).json({ tags: uniqueTags });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error getting tags",
    });
  }
}
