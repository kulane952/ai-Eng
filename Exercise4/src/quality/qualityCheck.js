const client = require("../config/openrouter");

async function qualityCheck(content) {
  const response = await client.chat.completions.create({
    model: "openai/gpt-5",
    messages: [
      {
        role: "system",
        content:
          "You are a professional content quality control specialist.",
      },
      {
        role: "user",
        content: `Review the following content:

${content}

Check:

1. Grammar
2. Spelling
3. Clarity
4. Structure
5. Repetition
6. Professional quality
7. Accuracy and consistency

Return the result using this format:

SCORE: /100

ISSUES:
- ...

IMPROVEMENTS:
- ...

FINAL_CONTENT:
...`,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = qualityCheck;