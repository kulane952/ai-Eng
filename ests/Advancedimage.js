
// Waxaan soo import-gareyneynaa OpenAI SDK,
// si aan ula xiriirno OpenRouter API.
import OpenAI from "openai";

// Waxaan soo import-gareyneynaa dotenv,
// si aan .env file-ka uga akhrino API key-ga.
import dotenv from "dotenv";

// Waxaan soo import-gareyneynaa fs,
// si aan images-ka file ahaan ugu kaydino.
import fs from "fs/promises";

// Waxaan load-gareyneynaa variables-ka ku jira .env.
dotenv.config();

// Waxaan sameyneynaa OpenAI client,
// laakiin waxaan u sheegaynaa inuu isticmaalo OpenRouter.
const openai = new OpenAI({
  // API key-ga waxaan ka qaadaneynaa .env.
  apiKey: process.env.OPENROUTER_API_KEY,

  // Waxaan OpenAI SDK u sheegaynaa in request-yada
  // loo diro OpenRouter halkii OpenAI si toos ah.
  baseURL: "https://openrouter.ai/api/v1",
});

// Generate variation of a concept
const generateImageVariation = async (basePrompt, styles) => {
  const variations = [];

  for (const style of styles) {
    const prompt = `${basePrompt} in ${style} style`;

    try {
      const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024",
        quality: "medium",
      });

      console.log(response.data[0]);

      variations.push({
        style: style,
        prompt: prompt,
        b64_json: response.data[0].b64_json,
        revisedPrompt: response.data[0].revised_prompt,
      });

      console.log(`✅ Generated: ${style}`);
    } catch (error) {
      console.log(`❌ Failed ${style}:`, error.message);
    }
  }

  return variations;
};

// Usage
const basePrompt = "A cozy coffee shop";

const styles = [
  "in anime style",
  "as a oil painting",
  "in cyberpunk style",
  "as a minimalist line drawing",
  "in photorealistic style",
];

const variation = await generateImageVariation(basePrompt, styles);

// Save images
for (let i = 0; i < variation.length; i++) {
  const image = variation[i];

  const buffer = Buffer.from(image.b64_json, "base64");

  const fileName = `generated_image_${i + 1}.png`;

  await fs.writeFile(fileName, buffer);

  console.log(`✅ Saved: ${fileName}`);

  console.log(`\n${i + 1}. Style: ${image.style}`);
  console.log(` original: ${image.prompt}`);
  console.log(` revised: ${image.revisedPrompt}`);
}

