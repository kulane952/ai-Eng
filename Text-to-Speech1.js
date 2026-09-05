import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;

const MODEL = "fish-audio/s2.1-pro-free:free";

if (!API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing");
}


// =====================================
// Generate Audio
// =====================================

async function generateVoice({
  speaker,
  text,
  emotion,
  instructions,
  filename,
}) {
  console.log("\n================================");
  console.log(`🎙️ Speaker: ${speaker}`);
  console.log(`😊 Emotion: ${emotion}`);
  console.log(`📝 File: ${filename}`);
  console.log("================================");


  // Instructions sent to Fish Audio
  const input = `
Speaking instructions:
${instructions}

Emotion and speaking style:
${emotion}

Speak the following text naturally and clearly:

${text}
`;


  const response = await fetch(
    "https://openrouter.ai/api/v1/audio/speech",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: MODEL,
        input: input,
        response_format: "mp3",
      }),
    }
  );


  console.log(`📡 Status: ${response.status}`);


  if (!response.ok) {
    const error = await response.text();

    console.error("❌ OpenRouter error:");
    console.error(error);

    throw new Error(
      `Failed to generate audio for ${speaker}`
    );
  }


  // Convert response to audio
  const audioBuffer = Buffer.from(
    await response.arrayBuffer()
  );


  // Create audio folder
  await fs.mkdir("./audio", {
    recursive: true,
  });


  // Save file
  const filePath = `./audio/${filename}`;

  await fs.writeFile(
    filePath,
    audioBuffer
  );


  console.log(`✅ Saved: ${filePath}`);

  return filePath;
}



// =====================================
// MULTI SPEAKER SCRIPT
// =====================================

const dialogue = [

  {
    speaker: "Ahmed",

    text:
      "Salaan! Maanta waxaan baranaynaa sida sirdoonka macmalka ah u shaqeeyo.",

    emotion:
      "excited and energetic",

    instructions:
      "You are Ahmed, a young Somali male teacher. Speak confidently, naturally and enthusiastically. Sound like a teacher who is excited to teach his students.",

    filename:
      "ahmed-01.mp3",
  },


  {
    speaker: "Aisha",

    text:
      "Waa wax aad u xiiso badan! Waxaan jeclaan lahaa inaan wax badan ka barto.",

    emotion:
      "happy, curious and enthusiastic",

    instructions:
      "You are Aisha, a young Somali female student. Speak warmly and naturally. Sound genuinely curious and excited about learning.",

    filename:
      "aisha-01.mp3",
  },


  {
    speaker: "Ahmed",

    text:
      "Haa. Laakiin marka hore waa inaan fahamnaa aasaaska AI iyo sida loo isticmaalo.",

    emotion:
      "calm, serious and educational",

    instructions:
      "You are Ahmed, a patient Somali male teacher. Explain the topic clearly and calmly. Sound intelligent, professional and supportive.",

    filename:
      "ahmed-02.mp3",
  },


  {
    speaker: "Aisha",

    text:
      "Haddaba, AI ma awoodaa inuu fahmo waxa qofku doonayo?",

    emotion:
      "curious and slightly surprised",

    instructions:
      "You are Aisha, a young Somali female student. Ask the question naturally. Sound curious and slightly surprised because the topic is fascinating.",

    filename:
      "aisha-02.mp3",
  },


  {
    speaker: "Ahmed",

    text:
      "Haa, AI wuxuu isticmaalaa xog iyo algorithms si uu u barto qaabab una sameeyo saadaal.",

    emotion:
      "confident and explanatory",

    instructions:
      "You are Ahmed, a knowledgeable Somali teacher. Explain the concept slowly and clearly, as if teaching a beginner.",

    filename:
      "ahmed-03.mp3",
  },


  {
    speaker: "Aisha",

    text:
      "Wow! Taasi waa arrin aad u cajiib ah.",

    emotion:
      "amazed and excited",

    instructions:
      "You are Aisha, a young Somali student hearing something impressive for the first time. Sound genuinely amazed and excited.",

    filename:
      "aisha-03.mp3",
  },

];



// =====================================
// MAIN
// =====================================

async function main() {

  console.log("\n🚀 MULTI-VOICE TTS STARTING");
  console.log(`🤖 Model: ${MODEL}`);
  console.log(`👥 Speakers: ${dialogue.length}`);


  for (const line of dialogue) {

    await generateVoice(line);

  }


  console.log("\n\n====================================");
  console.log("🎉 ALL AUDIO FILES GENERATED!");
  console.log("====================================");


  console.log("\n📁 Generated files:\n");


  for (const line of dialogue) {

    console.log(
      `🔊 ${line.speaker} → ./audio/${line.filename}`
    );

  }

}


main().catch((error) => {

  console.error("\n❌ ERROR:");
  console.error(error);

});