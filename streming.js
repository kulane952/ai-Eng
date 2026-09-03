import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log("API KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
// Streaming text generation for real-time display

const streamText = async (prompt) => {
    const stream=await openai.chat.completions.create({
        model: "openai/gpt-5-mini",
        messages: [{role: 'user', content: prompt}],
        // max_tokens: 150,
        stream: true
    });
//intaan ayaa sameeneyasa streaming
    let fullResponse = '';
    for await (const chunk of stream) {
        const content=chunk.choices?.[0]?.delta?.content || '';
        if (content) {
            process.stdout.write(content);
            //Display text as it generates
            fullResponse += content;
        }

    }
    //ilaa halkane waaye
    console.log('\n\n--stream Complete---')
    return fullResponse;
};

//Usage
const result = await streamText("Explain how async/await works in JavaScript with an example.");
console.log(streamText)


