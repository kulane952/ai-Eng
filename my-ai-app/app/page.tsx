"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function Home() {
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="text-center py-6 border-b">
        <h1 className="text-3xl font-bold mb-2">
          AI SDK Chat
        </h1>

        <p className="text-gray-600">
          Streaming chat example
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={`${message.id}-${index}`}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-lg ${message.role === "user"
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-900"
                  }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div
                        key={index}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!input.trim()) return;

            sendMessage({
              text: input,
            });

            setInput("");
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex space-x-2">
            <input
              className="flex-1 p-3 border rounded-lg"
              value={input}
              placeholder="Say something..."
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="submit"
              className="px-4 py-3 bg-red-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}