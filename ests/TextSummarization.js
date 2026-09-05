import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log("API KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
const summarizeText = async (text, length = 'short') => {
  const lengthInstructions = {
    short: 'in 2-3 sentences',
    medium: 'in 1-2 paragraphs',
    long: 'in 3-4 paragraphs'
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'user',
      content: `Please summarize this text ${lengthInstructions[length]}:\\n\\n${text}`
    }],
    max_tokens: length === 'short' ? 100 : length === 'medium' ? 200 : 400
  });

  return response.choices[0].message.content;
};

// Usage
const longArticle = `
Artificial intelligence has transformed the way we interact with technology...
[Your long text here]
`;

const summary = await summarizeText(longArticle, 'short');
console.log('Summary:', summary);
