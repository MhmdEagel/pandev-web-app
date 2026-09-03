import type { Interactions, } from "@google/genai";


interface Interaction {
    id?: string;
    conversations: Conversation[]
}

interface Conversation{
    type: string;
    content: {
        type: string;
        text?: string;
    }[]
}

export type {Conversation, Interaction}