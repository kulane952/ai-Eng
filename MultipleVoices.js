

// import OpenAI from "openai";
// import dotenv from "dotenv";
// import fs from "fs/promises";

// dotenv.config();

// console.log(
//   "API KEY EXISTS:",
//   !!process.env.OPENROUTER_API_KEY
// );

// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
// });


// //Generate speech with different vioce

// const generateVoiceVariations =async(text)=>{
//     // const voices =['alloy','echo','fable','onyx','nova','shimmer'];
//     const voices = [
//   "flux-alexis-en",
//   "flux-bree-en",
//   "flux-bruce-en",
//   "flux-gemma-en",
//   "flux-jack-en",
//   "flux-priya-en"
// ];
//     console.log(`🎙️ Generating speech with ${voices.length} different voices...`);
//     for (const voice of voices){
//         try{
//             const response = await openai.audio.speech.create({
//                 model: "deepgram/flux-tts:free",
//                 voice:voice,
//                 input:text,
//                 response_format:'mp3',
//                 speed:1.0
//             });
//             const buffer = Buffer.from(await response.arrayBuffer());

//             await fs.writeFile(`./audio/${voice}.mp3`,buffer);
//             console.log(`✅ Audio saved: ${voice}.mp3`);
            
//         }catch(error){
//             console.error(`❌ Error generating speech for voice ${voice}:`,error.message);
//         }
//     }
// };
// //usage
// const text = "This demonstrates different AI voice personalities and tones.";
// await generateVoiceVariations(text);


import OpenAI from "openai";
import axios from "axios";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

// OpenRouter configuration
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Complete workflow:
// Text → Speech → Text → Enhanced Text → Enhanced Speech
const voiceWorkflow = async (originalText) => {
  try {
    // Make sure audio folder exists
    await fs.mkdir("./audio", { recursive: true });

    console.log("🎤 Step 1: Converting text to speech...");

    // ==========================================
    // STEP 1: TEXT → SPEECH
    // ==========================================

    const speechResponse = await openai.audio.speech.create({
      model: "deepgram/flux-tts:free",
      voice: "flux-alexis-en",
      input: originalText,
      response_format: "mp3",
    });

    const speechBuffer = Buffer.from(
      await speechResponse.arrayBuffer()
    );

    await fs.writeFile(
      "./audio/step1-original-speech.mp3",
      speechBuffer
    );

    console.log("✅ Step 1 complete");
    console.log(
      "📁 Saved: ./audio/step1-original-speech.mp3"
    );

    // ==========================================
    // STEP 2: SPEECH → TEXT
    // ==========================================

    console.log("🎧 Step 2: Converting speech back to text...");

    const transcription = await openai.audio.transcriptions.create({
      file: new File(
        [speechBuffer],
        "audio.mp3",
        {
          type: "audio/mpeg",
        }
      ),
      model: "deepgram/flux-tts:free",
    });

    console.log("✅ Step 2 complete");
    console.log("📝 Transcription:");
    console.log(transcription.text);

    // ==========================================
    // STEP 3: ENHANCE TEXT WITH LLM
    // ==========================================

    console.log("✨ Step 3: Enhancing the text...");

    const enhancedResponse =
      await openai.chat.completions.create({
        model: "inclusionai/ling-3.0-flash-fin:free",

        messages: [
          {
            role: "user",
            content: `Make this text more engaging and professional:

"${transcription.text}"`,
          },
        ],

        max_tokens: 200,
      });

    const enhancedText =
      enhancedResponse.choices[0].message.content;

    console.log("✅ Step 3 complete");
    console.log("✨ Enhanced text:");
    console.log(enhancedText);

    // ==========================================
    // STEP 4: ENHANCED TEXT → ELEVENLABS SPEECH
    // ==========================================

    console.log("🔊 Step 4: Converting enhanced text to speech...");

    try {
      const elevenResponse = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb",

        {
          text: enhancedText,

          model_id: "eleven_multilingual_v2",

          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        },

        {
          headers: {
            "xi-api-key": process.env.ELEVENLABS_API_KEY,

            "Content-Type": "application/json",

            Accept: "audio/mpeg",
          },

          responseType: "arraybuffer",
        }
      );

      await fs.writeFile(
        "./audio/step4-enhanced-speech.mp3",
        Buffer.from(elevenResponse.data)
      );

      console.log("✅ Step 4 complete");
      console.log(
        "📁 Saved: ./audio/step4-enhanced-speech.mp3"
      );
    } catch (elevenError) {
      console.log(
        "⚠️ ElevenLabs failed, using OpenRouter fallback..."
      );

      // ==========================================
      // FALLBACK: OPENROUTER TTS
      // ==========================================

      const fallbackResponse =
        await openai.audio.speech.create({
          model: "deepgram/flux-tts:free",

          voice: "flux-alexis-en",

          input: enhancedText,

          response_format: "mp3",
        });

      const fallbackBuffer = Buffer.from(
        await fallbackResponse.arrayBuffer()
      );

      await fs.writeFile(
        "./audio/step4-enhanced-speech.mp3",
        fallbackBuffer
      );

      console.log("✅ Fallback TTS complete");
      console.log(
        "📁 Saved: ./audio/step4-enhanced-speech.mp3"
      );
    }

    // ==========================================
    // FINAL RESULT
    // ==========================================

    console.log("\n==============================");
    console.log("🎉 WORKFLOW COMPLETE");
    console.log("==============================");

    console.log("Original text:");
    console.log(originalText);

    console.log("\nTranscribed text:");
    console.log(transcription.text);

    console.log("\nEnhanced text:");
    console.log(enhancedText);

    console.log("\nAudio files:");
    console.log(
      "1️⃣ ./audio/step1-original-speech.mp3"
    );

    console.log(
      "2️⃣ ./audio/step4-enhanced-speech.mp3"
    );

    return {
      originalText,
      transcription: transcription.text,
      enhancedText,
      originalAudio:
        "./audio/step-anas-speech.mp3",
      enhancedAudio:
        "./audio/step4-enhanced-speech.mp3",
    };
  } catch (error) {
    console.error("\n❌ Workflow Error:");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

// ==========================================
// RUN WORKFLOW
// ==========================================

const text = `
Artificial intelligence is changing the way we build software.
AI engineers can now create intelligent applications
that understand text, images, audio, and video how are you today?
and whats is language model and how it works. This workflow demonstrates
how to convert text to speech, transcribe it back to text,
enhance the text with an LLM, and then convert it back to speech
using both OpenRouter and ElevenLabs APIs.
`;

voiceWorkflow(text);