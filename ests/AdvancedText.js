import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log("API KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

//Advance text generation with customizable parameters
const advancedGenerate = async (prompt, options = {}) => {
  const response = await openai.chat.completions.create({
    model: options.model || 'gpt-4',
    messages: [
      {
        role: 'system',
        content: options.systemPrompt || 'You are a helpful assistant.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: options.maxTokens || 300,
    temperature: options.temperature || 0.7,
    top_p: options.topP || 1.0
  });

  return {
    text: response.choices[0].message.content,
    usage: response.usage,
    model: response.model
  };
};

// Usage examples
const creativeStory = await advancedGenerate(
  "Write a short story about a robot learning to paint",
  {
    model: 'gpt-4',
    temperature: 0.9, // More creative
    maxTokens: 400,
    systemPrompt: 'You are a creative storyteller who writes engaging short stories.'
  }
);

const technicalDoc = await advancedGenerate(
  "Explain how REST APIs work",
  {
    model: 'gpt-4',
    temperature: 0.2, // More factual
    maxTokens: 300,
    systemPrompt: 'You are a technical documentation expert who explains complex concepts clearly.'
  }
);

console.log('Creative Story:', creativeStory.text);
console.log('Technical Doc:', technicalDoc.text);