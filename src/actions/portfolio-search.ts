"use server";

import { prisma } from "@/lib/prisma";
import { generateEmbedding } from "./gemini/embedding";

interface VectorSearchOptions {
  query: string;
  matchThreshold?: number;
  matchCount?: number;
}

const DEFAULT_MATCH_THRESHOLD = 0.5;
const DEFAULT_MATCH_COUNT = 10;

export async function searchPortfolios({
  query,
  matchThreshold = DEFAULT_MATCH_THRESHOLD,
  matchCount = DEFAULT_MATCH_COUNT,
}: VectorSearchOptions) {
  try {
    const values = await generateEmbedding(query);
    const vectorString = `[${values.join(",")}]`;
    const results = await prisma.$queryRaw<
      Array<{
        id: string;
        thumbnail: string;
        name: string;
        category: string;
        description: string;
        demo_link: string | null;
        repository_link: string;
        status: string;
        tech_stacks: unknown;
        created_at: Date;
        updated_at: Date;
        similarity: number;
      }>
    >`
      SELECT
        id,
        thumbnail,
        name,
        category,
        description,
        demo_link,
        repository_link,
        status,
        tech_stacks,
        created_at,
        updated_at,
        1 - (embedding <=> ${vectorString}::vector) AS similarity
      FROM "Portfolio"
      WHERE embedding IS NOT NULL
        AND 1 - (embedding <=> ${vectorString}::vector) > ${matchThreshold}
      ORDER BY embedding <=> ${vectorString}::vector
      LIMIT ${matchCount}
    `;

    return { success: true, data: results };
  } catch (error) {
    console.error("Error searching portfolios:", error);
    return { success: false, error: "Gagal mencari portofolio" };
  }
}
