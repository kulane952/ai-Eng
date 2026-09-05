import "dotenv/config";
import fs from "fs/promises";

const API_KEY = process.env.OPENROUTER_API_KEY;

if (!API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing");
}

export async function generateImage(prompt, filename) {
  console.log(`🎨 Generating ${filename}`);

  const response = await fetch(
    "https://openrouter.ai/api/v1/images",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "openai/gpt-image-1",
        prompt,
        aspect_ratio: "1:1",
        quality: "medium",
        n: 1,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      JSON.stringify(result)
    );
  }

  const image = result.data?.[0]?.b64_json;

  if (!image) {
    throw new Error("No image returned from OpenRouter");
  }

  await fs.mkdir("generated", {
    recursive: true,
  });

  await fs.writeFile(
    filename,
    Buffer.from(image, "base64")
  );

  console.log(`✅ Saved ${filename}`);
}