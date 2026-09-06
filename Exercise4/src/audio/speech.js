const fs = require("fs");
const path = require("path");

async function generateSpeech(
  text,
  outputFile = "article.mp3"
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/audio/speech",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "fish-audio/s2.1-pro-free:free",
        voice: "alloy",
        input: text,
        response_format: "mp3",
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Speech generation failed: ${error}`);
  }

  const audioBuffer = Buffer.from(
    await response.arrayBuffer()
  );

  const outputDirectory = path.join(process.cwd(), "output");

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, {
      recursive: true,
    });
  }

  const filePath = path.join(
    outputDirectory,
    outputFile
  );

  fs.writeFileSync(filePath, audioBuffer);

  return filePath;
}

module.exports = generateSpeech;