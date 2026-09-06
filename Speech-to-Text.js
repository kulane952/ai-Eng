import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

console.log(
  "API KEY EXISTS:",
  !!process.env.OPENROUTER_API_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function speechToText() {
  try {
    const transcription =
      await openai.audio.transcriptions.create({
        file: fs.createReadStream(
          "audio/ahmed-01.mp3"
        ),

        model:
          "fish-audio/s2.1-pro-free:free",
      });

    console.log(
      "\n🎤 TRANSCRIPTION:"
    );

    console.log(
      transcription.text
    );
  } catch (error) {
    console.error(
      "\n❌ ERROR:"
    );

    console.error(
      error.message
    );
  }
}

speechToText();