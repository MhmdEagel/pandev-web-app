"use server";

import { ai } from "@/lib/gemini";
import { searchPortfolios } from "../portfolio-search";
import { createPortfolioFunction } from "./functions";

export async function getAiResponse({
  message,
  interaction_id,
}: {
  message: string;
  interaction_id?: string;
}) {
  const { data, error } = await searchPortfolios({ query: message });

  let contextData = "";

  if (!data || data.length === 0) {
    contextData =
      "No relevant data found that are similar or relevant to the question";
  } else {
    contextData = data.map((item) => JSON.stringify(item)).join("\n");
  }
  const response = await ai.interactions.create({
    model: "gemini-3-flash-preview",
    input: message,
    generation_config: {
      thinking_level: "minimal",
      max_output_tokens: 2048,
      stop_sequences: ["\n\n\n", "###", "User:", "Pengguna:"],
    },
    previous_interaction_id: interaction_id,
    system_instruction: `
      <role>
        You are an ai assistant name iria with a soft spoken personality that answer every question from the user with professional attitude. You are working in a professional IT agency PanDev that offers service in website, mobile, and desktop app development. Also offers multimedia services like video editing, poster making, logo design for business needs. And it offers IOT Solutions
      </role>
      <input>
        User query: ${message}
      </input>
      <context>
        Relevant portfolio data from the database (Ordered from most relevant):
        ${contextData}
      </context>
      <instruction>
        - Answer the user question ONLY based on the relevant portfolio data above.
        - Answer question from the users about portfolio management for the app
        - Answer with simple, straight, and short answer but still professional
        - Answer in bahasa indonesia
        - If user question is general, answer generally
        - If there is no relevant data at all, state that the data is not availble in the history.
      </instruction>
      <constraint>
        - Don't assume any data if user doesn't provide any data at all to you
        - Only answer the questions only about portfolio management in the IT agency PanDev
      </constraint>
    `,
    // output control
  });
  return { interaction_id: response.id, text: response.output_text };
}

export async function createPortfolioWizard(query: string) {
  const response = await ai.interactions.create({
    model: "gemini-3-flash-preview",
    input: query,
    generation_config: {
      thinking_level: "minimal",
      max_output_tokens: 2048,
      stop_sequences: ["\n\n\n", "###", "User:", "Pengguna:"],
    },
    system_instruction: `
      <role>
        You are an ai assistant that responsible to create a portofolio item. You are working in a professional IT agency PanDev that offers service in website, mobile, and desktop app development. Also offers multimedia services like video editing, poster making, logo design for business needs. And it offers IOT Solutions
      </role>
      <input>
        User query: ${query}
      </input>
      <context>
        current Date: ${new Date().toISOString()}
      </context>
      <instruction>
        - Answer with simple, straight, and short answer
        - Answer in bahasa indonesia
      </instruction>
      <constraint>
        - Don't assume any data if user doesn't provide any data at all to you
        - Only answer the questions only about portfolio management in the IT agency PanDev
      </constraint>
    `,
    tools: [createPortfolioFunction],
    // output control
  });

  for (const step of response.steps) {
    if (step.type === "function_call") {
      switch (step.name) {
        case "create_portfolio":
          return { message: response.output_text, data: step.arguments };
          
        default:
          return { message: "Gagal mengisi form", data: null };
      }
    }
  }
}
