import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log("API KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const generateText = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "openai/gpt-5-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
    });

    console.log("FULL RESPONSE:");
    console.log(response);

    return response.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("OpenRouter Error:");
    console.error(error);
  }
};

const result = await generateText(
  "Write a brief introduction about JavaScript"
);

console.log("RESULT:");
console.log(result); 