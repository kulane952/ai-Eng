import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log("API KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Question answering with context

const answerQuestion = async (context, question) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
          {
        role: 'system',
        content: 'You are a helpful assistant that answers questions based on the provided context. If the answer is not in the context, say so.'
      },
      {
        role: "user",
        content: `Context: ${context}\n\nQuestion: ${question}`
      }
    ],
    max_tokens: 150
  });

  return response.choices[0].message.content;
};

// Usage
const context = `
JavaScript is a versatile programming language primarily used for web development. It allows developers to create interactive web pages and is an essential part of web technologies alongside HTML and CSS. JavaScript can be executed on the client side (in the browser) as well as on the server side (using environments like Node.js).
`;  
const question = "What is JavaScript used for?";
const answer = await answerQuestion(context, question);
console.log('Answer:', answer);
