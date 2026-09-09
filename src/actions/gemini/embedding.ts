"use server";

import { ai } from "@/lib/gemini";

export async function generateEmbedding(contents: string) {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents,
      config: {
        outputDimensionality: 768,
      },
    });

    if (
      !response.embeddings ||
      response.embeddings.length === 0 ||
      !response.embeddings[0].values
    ) {
      throw new Error("Failed to generate embedding");
    }

    
    return response.embeddings[0].values;
  } catch (error) {
    throw error;
  }
}
