import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function main() {
  const response = await openai.chat.completions.create({
    // model: "poolside/laguna-xs-2.1:free",
    // model: "google/gemma-4-31b-it:free",
    model: "inclusionai/ling-3.0-flash-fin:free",

    messages: [
      {
        role: "user",
        content:
          `Create a small modern homepage using only HTML and CSS.

Requirements:

* Create a simple landing page for an AI learning platform called "LearnAI".
* Include a navigation bar with the logo "LearnAI" and links: Home, Courses, About, Contact.
* Add a hero section with:

  * A large heading: "Learn AI. Build the Future."
  * A short description.
  * A primary "Start Learning" button.
  * A secondary "Explore Courses" button.
* Add a small features section with 3 cards:

  1. AI Courses
  2. Hands-on Projects
  3. Learn at Your Own Pace
* Add a simple footer.
* Make the design modern, clean, and responsive.
* Use a professional color palette.
* Add hover effects to buttons and navigation links.
* Do not use JavaScript.
* Do not use external libraries or frameworks.
* Return the complete code in two separate code blocks:

  1. index.html
  2. style.css
* Make sure the HTML correctly links to style.css.
* Write clean, beginner-friendly code.
`,
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

main();