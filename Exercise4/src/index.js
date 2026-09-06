require("dotenv").config();

const generateArticle = require("./content/article");
const generateSummary = require("./content/summary");
const generateSocialPosts = require("./content/socialPost");

const generateImage = require("./visual/image");
const generateSpeech = require("./audio/speech");

const qualityCheck = require("./quality/qualityCheck");

const exportContent = require("./export/exportContent");

async function main() {
  try {
    const topic = "Artificial Intelligence";

    console.log("\n==============================");
    console.log("AI CONTENT STUDIO");
    console.log("==============================");

    // =====================================
    // 1. CONTENT CREATION
    // =====================================

    console.log("\n===== ARTICLE =====\n");

    const article = await generateArticle(topic);

    console.log(article);

    console.log("\n===== SUMMARY =====\n");

    const summary = await generateSummary(article);

    console.log(summary);

    console.log("\n===== SOCIAL POSTS =====\n");

    const socialPosts = await generateSocialPosts(topic);

    console.log(socialPosts);

    // =====================================
    // 2. VISUAL DESIGN
    // =====================================

    console.log("\n===== VISUAL DESIGN =====\n");

    const imagePrompt = `
Create a professional social media visual about:

${topic}

Style:
- Modern
- Professional
- Clean
- High quality
- Attractive composition
- Suitable for technology content
`;

    const imagePath = await generateImage(imagePrompt);

    console.log("Image created:", imagePath);

    // =====================================
    // 3. AUDIO
    // =====================================

    console.log("\n===== AUDIO =====\n");

    const audioPath = await generateSpeech(
      article,
      "article.mp3"
    );

    console.log("Audio created:", audioPath);

    // =====================================
    // 4. QUALITY CONTROL
    // =====================================

    console.log("\n===== QUALITY CONTROL =====\n");

    const quality = await qualityCheck(article);

    console.log(quality);

    // =====================================
    // 5. EXPORT
    // =====================================

    console.log("\n===== EXPORT =====\n");

    const articleFile = exportContent(
      article,
      "article.txt"
    );

    const summaryFile = exportContent(
      summary,
      "summary.txt"
    );

    const socialFile = exportContent(
      socialPosts,
      "social-posts.txt"
    );

    const qualityFile = exportContent(
      quality,
      "quality-report.txt"
    );

    console.log("Article:", articleFile);
    console.log("Summary:", summaryFile);
    console.log("Social Posts:", socialFile);
    console.log("Quality Report:", qualityFile);
    console.log("Image:", imagePath);
    console.log("Audio:", audioPath);

    console.log("\n==============================");
    console.log("AI CONTENT STUDIO COMPLETED");
    console.log("==============================");

  } catch (error) {
    console.error("\nAI ERROR:");
    console.error(error.message);
  }
}

main();