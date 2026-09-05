import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;

const MODEL = "fish-audio/s2.1-pro-free:free";

console.log("MODEL:", MODEL);
console.log("API KEY:", API_KEY ? "FOUND" : "MISSING");

const response = await fetch(
  "https://openrouter.ai/api/v1/audio/speech",
  {
    method: "POST",

    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      model: MODEL,
      input: "Salaan wanaagsan. Tani waa tijaabo cod ah.",
      response_format: "mp3",
    }),
  }
);

console.log("STATUS:", response.status);
console.log(
  "CONTENT TYPE:",
  response.headers.get("content-type")
);

if (!response.ok) {
  const error = await response.text();

  console.log("\n❌ ERROR FROM OPENROUTER:");
  console.log(error);

  process.exit(1);
}

const audio = Buffer.from(
  await response.arrayBuffer()
);

await fs.writeFile(
  "test-fish.mp3",
  audio
);

console.log("\n✅ SUCCESS!");
console.log("🎧 Audio saved: test-fish.mp3");