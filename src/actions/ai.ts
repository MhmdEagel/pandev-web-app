"use server";

import { ai } from "@/lib/gemini";

export async function getAiResponse({
  message,
  interaction_id,
}: {
  message: string;
  interaction_id?: string;
}) {
  const response = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: message,
    generation_config: {
      thinking_level: "minimal",
    },
    previous_interaction_id: interaction_id,
    system_instruction: `Jawab pertanyaan user dengan ringkas`
  });
  return { interaction_id: response.id, text: response.output_text };
}
