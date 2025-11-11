import { pipeline } from "@xenova/transformers";
import { normalize } from "path";

let embedder: any = null;

//Detta initierar embedding-modellen (Sentence-BERT)
async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

/**
 * Generate embedding vector for text
 * @param text - The text to embed
 * @returns Array of numbers representing the embedding
 */

export async function generateEmbedding(text: string): Promise<number[]> {
  const model = await getEmbedder();
  const output = await model(text, { pooling: "mean", normalize: true });

  return Array.from(output.data);
}

//Magisk uträkning på likheten mellan två embedding vectors
//Returnerar 0-1 skala

export function calculateCosineSimilarity(vec1: number[], vec2: number[]) {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (mag1 * mag2);
}
