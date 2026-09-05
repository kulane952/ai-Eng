// Waxaan soo import-gareyneynaa fs module,
// si aan image-ka ugu save gareyno file-ka local.
import fs from 'fs/promises';

// Waxaan soo import-gareyneynaa OpenAI SDK,
// si aan ula xiriirno OpenRouter API.
import OpenAI from "openai";

// Waxaan soo import-gareyneynaa dotenv,
// si aan .env file-ka uga akhrino API key-ga.
import dotenv from "dotenv";

// Waxaan load-gareyneynaa variables-ka ku jira .env.
dotenv.config();


// Waxaan sameyneynaa OpenAI client,
// laakiin waxaan u sheegaynaa inuu isticmaalo OpenRouter.
const openai = new OpenAI({
  // API key-ga waxaan ka qaadaneynaa .env.
  apiKey: process.env.OPENROUTER_API_KEY,

  // Waxaan OpenAI SDK u sheegaynaa in request-yada
  // loo diro OpenRouter halkii OpenAI si toos ah.
  baseURL: "https://openrouter.ai/api/v1"
});


//Generate image with OpenRouter latest model GPT-Image-1
const generateImage = async (prompt) => {
    const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024",
        quality: "medium",
    });

    const image = response.data[0];

    if (!image.b64_json) {
        throw new Error("Image data was not returned as b64_json");
    }

    return {
        b64: image.b64_json,
        revisedPrompt: image.revised_prompt,
    };
};

// Save image to local file
const saveImageToFile = async (base64Image, filePath) => {
    const buffer = Buffer.from(base64Image, "base64");

    await fs.writeFile(filePath, buffer);

    console.log(`Image saved to ${filePath}`);
};

// Example
const result = await generateImage(
    "A futuristic city with flying drones at sunset"
);

console.log("Revised Prompt:", result.revisedPrompt);

await saveImageToFile(
    result.b64,
    "./image/generated_image.png"
);