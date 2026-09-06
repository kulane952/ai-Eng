const fs = require("fs");
const path = require("path");

async function generateImage(prompt) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/images",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Image generation failed: ${error}`);
  }

  const result = await response.json();

  const image = result.data?.[0]?.b64_json;

  if (!image) {
    throw new Error("No image was returned from OpenRouter");
  }

  const outputDirectory = path.join(process.cwd(), "output");

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, {
      recursive: true,
    });
  }

  const filePath = path.join(
    outputDirectory,
    "generated-image.png"
  );

  const imageBuffer = Buffer.from(image, "base64");

  fs.writeFileSync(filePath, imageBuffer);

  return filePath;
}

module.exports = generateImage;