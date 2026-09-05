import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { generateImage } from "./imageGenerator.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/generated", express.static(path.join(__dirname, "generated")));

app.post("/api/generate", async (req, res) => {
  try {
    const { theme } = req.body;

    if (!theme || !theme.trim()) {
      return res.status(400).json({
        error: "Theme is required",
      });
    }

    const images = [];

    for (let i = 1; i <= 3; i++) {
      const prompt = `
Create a unique professional AI artwork based on:

"${theme}"

This is artwork ${i} of 3.

Make this version visually different from the others.
Use cinematic composition, beautiful lighting,
high detail, creative art direction,
and gallery-quality presentation.
`;

      const filename = `generated/${theme
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${i}.png`;

      await generateImage(prompt, filename);

      images.push({
        title: `Artwork ${i}`,
        url: `/${filename}`,
      });
    }

    res.json({
      success: true,
      theme,
      images,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});