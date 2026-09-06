const client = require("../config/openrouter");

async function generateArticle(topic) {
  const response = await client.chat.completions.create({
    model: "minimax/minimax-m3:free",
    messages: [
      {
        role: "system",
        content:
          "You are a professional content writer. Write clear, useful and professional articles.",
      },
      {
        role: "user",
        content: `Write a professional article about: ${topic}

Requirements:
- Create a strong title
- Write an introduction
- Use clear sections
- Explain the topic deeply
- Add a conclusion
- Use professional language`,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = generateArticle;