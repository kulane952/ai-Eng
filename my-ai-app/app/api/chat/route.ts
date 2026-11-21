
import {
  streamText,
  type UIMessage,
} from "ai";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  console.log("messages:", messages);
  console.log("isArray:", Array.isArray(messages));

  const modelMessages = messages.map((message) => ({
    role: message.role,
    content: message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(""),
  }));

  const result = streamText({
    model: openrouter("inclusionai/ling-3.0-flash-fin:free"),
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}

