import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

console.log(
  "API KEY EXISTS:",
  !!process.env.OPENROUTER_API_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Generate text-to-speech
const textToSpeech = async (text) => {
  const response = await openai.audio.speech.create({
    model: "hexgrad/kokoro-82m",
    voice: "af_heart",
    input: text,
    response_format: "mp3",
  });

  const buffer = Buffer.from(
    await response.arrayBuffer()
  );

  return buffer;
};

// Save audio to file
const saveAudioToFile = async (audioBuffer, filename) => {
  await fs.writeFile(filename, audioBuffer);

  console.log(`Audio saved to ${filename}`);
};

// Usage
const text =
  "Hello, this is a test of text to speech using OpenRouter free api to use.";

const audioBuffer = await textToSpeech(text);

await saveAudioToFile(
  audioBuffer,
  "./audio/codkale.mp3"
);