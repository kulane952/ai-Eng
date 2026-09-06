const client = require("../config/openrouter");

async function generateSummary(text) {
  const response = await client.chat.completions.create({
    model: "minimax/minimax-m3:free",
    messages: [
      {
        role: "system",
        content:
          "You are a professional summarization assistant.",
      },
      {
        role: "user",
        content: `Summarize the following content clearly and accurately:

${text}

Requirements:
- Keep the important information
- Remove unnecessary details
- Make it easy to understand
- Keep it concise`,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = generateSummary;