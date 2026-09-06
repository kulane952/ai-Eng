const client = require("../config/openrouter");

async function generateSocialPosts(topic) {
  const response = await client.chat.completions.create({
    model: "minimax/minimax-m3:free",
    messages: [
      {
        role: "system",
        content:
          "You are a professional social media content creator.",
      },
      {
        role: "user",
        content: `Create 5 social media posts about:

${topic}

Requirements:
- Each post must be different
- Make them engaging
- Keep them easy to read
- Include relevant hashtags
- Do not use unnecessary emojis`,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = generateSocialPosts;