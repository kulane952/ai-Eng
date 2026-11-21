
import "dotenv/config";
import fs from "node:fs/promises";

const API_KEY = process.env.OPENROUTER_API_KEY;
// const MODEL = "openai/gpt-4o-mini-tts-2025-12-15";
// const MODEL = "fish-audio/s2.1-pro-free:free";
const MODEL = "elevenlabs/eleven-v4";

// System prompt: tilmaamaha loogu diyaarinayo qoraalka Af-Soomaaliga
const SYSTEM_PROMPT = `
You are an expert Somali-language narrator.

Read the following Somali story naturally and clearly.

- Use clear, natural Somali pronunciation.
- Preserve Somali letters C, X, and KH.
- Pronounce Somali words as Somali, not English.
- Speak at a moderate, natural pace.
- Use natural pauses at commas and full stops.
- Make the storytelling suspenseful and emotional where appropriate.
- Keep names and Somali words unchanged.
- Do not translate, summarize, or add words.
`;

// Sheekada
const STORY = `
Habeenkii Guriga Madow.

Habeen habeenada ka mid ah, ayaa wiil la oran jiray Ayaanle
uu safar ka soo galay magaalada Muqdisho.

Saacaddu waxay ahayd laba iyo tobankii habeenimo.
Roob xooggan ayaa da'ayay, waddooyinkuna cidlo ayay ahaayeen.

Intii uu jidka ku jiray, gaarigiisii ayaa si lama filaan ah u istaagay.

Wuxuu isku dayay inuu dib u shido, laakiin ma uusan kicin.

Markaas ayuu meel fog ka arkay guri duug ah oo iftiin yar ka baxayo.

Ayaanle wuxuu go'aansaday inuu gurigaas u socdo
si uu caawimaad u helo.

Markii uu albaabka garaacay, albaabkii ayaa tartiib u furmay.

Gudaha cidna kama muuqan.

Laakiin wuxuu maqlay cod haweeney oo leh:

"Waan ogaa inaad caawa imaan doonto, Ayaanle."

Wuu naxay.

Sidee ayay haweeneydu magaciisa ku ogaatay?

Wuxuu dib ugu laabtay albaabka, laakiin albaabkii wuu xirmay.

Taleefankiisii ayaa isla markiiba shidmay,
inkastoo uusan lahayn wax batari ah.

Shaashadda waxaa ka soo muuqday hal fariin:

"Ha eegin qolka dabaqa sare."

Laakiin isla markiiba, wuxuu maqlay cod ilmo yar
oo ka yeeraya dabaqa sare.

"Walaal, fadlan i caawi."

Ayaanle wuxuu istaagay jaranjaradii,
isagoo neeftu ku dhegtay.

Codkii ilmaha ayaa mar kale yeeray:

"Walaal, haddii aadan hadda imaan,
berri adiga ayaa meeshayda joogi doona."

Ayaanle wuxuu qaaday tallaabadii ugu horreysay ee jaranjarada.

Markaas ayuu gadaashiisa ka maqlay codkii haweeneyda:

"Waxaan ku iri, ha aadin dabaqa sare!"

Wuxuu si degdeg ah u soo jeestay.

Haweeneydii waxay taagnayd meel dhow,
wejigeedana maro madow ayaa qarisay.

Laakiin waxa Ayaanle argagax geliyay ma ahayn haweeneyda.

Waxay ahayd waxa gacanteeda ku jiray.

Waxay haysay sawir duug ah oo muujinayay Ayaanle
isaga oo yar, dhex taagan gurigaas.

Sawirka gadaashiisa waxaa ku qornaa:

"Wiilkan wuxuu guriga ku dhintay labaatan sano ka hor."

Ayaanle wuxuu rabay inuu qayliyo,
laakiin cod ma uusan soo saari karin.

Haweeneydii waxay kor u qaadday madaxeeda oo tiri:

"Ugu dambayn waad soo noqotay."

Laakiin su'aasha ugu weyn waxay ahayd:

Haddii Ayaanle gurigaas ku dhintay labaatan sano ka hor,
yaa hadda guriga soo galay?
`;

async function main() {
  if (!API_KEY) {
    throw new Error("OPENROUTER_API_KEY lagama helin .env");
  }

  console.log("MODEL:", MODEL);
  console.log("Generating speech...");

  const response = await fetch("https://openrouter.ai/api/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    // Fiiro gaar ah:
    // Endpoint-kan TTS wuxuu qaataa input, model iyo voice.
    // SYSTEM_PROMPT si toos ah uguma shaqeeyo endpoint-kan.
    body: JSON.stringify({
      model: MODEL,
      input: STORY,
      voice: "ooA20ff7b4vtPDBR3VIi",
      response_format: "mp3",
    }),
  });

  console.log("STATUS:", response.status);
  console.log("CONTENT TYPE:", response.headers.get("content-type"));

  if (!response.ok) {
    console.error(await response.text());
    return;
  }

  const audio = Buffer.from(await response.arrayBuffer());

  await fs.writeFile("test-anas.mp3", audio);

  console.log("SUCCESS: Audio saved to test-anas.mp3");
}

main().catch((error) => {
  console.error("Request failed:", error.message);
});


// import OpenAI from "openai";
// import fs from "fs/promises";
// import dotenv from "dotenv";

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
// });

// async function generateSomaliSpeech(text) {
//   try {
//     console.log("🎤 Generating Somali speech...");

//     const response = await openai.audio.speech.create({
//       model: "openai/gpt-6-luna",
//       voice: "Kore",
//       input: `
// MUHIIM: Ku hadal Af-Soomaali nadiif ah oo cad.

// - Eray kasta oo Soomaali ah si cad ugu dhawaaq.
// - Ha qalloocin erayada.
// - Ha liqin ama ha isku darin erayada.
// - Ha isticmaalin dhawaaq Ingiriisi.
// - Ha ku hadlin cod robot ah.
// - Ku hadal si dabiici ah oo qof Soomaali ah fahmi karo.
// - Xawaare dhexdhexaad ah isticmaal.
// - Samee hakad dabiici ah.

// Qoraalka:
// ${text}
// `,
//       response_format: "mp3"
//     });

//     const audioBuffer = Buffer.from(
//       await response.arrayBuffer()
//     );

//     await fs.writeFile(
//       "./somali-speech.wav",
//       audioBuffer
//     );

//     console.log("✅ Somali speech generated!");
//     console.log("📁 Saved: ./somali-speech.wav");

//   } catch (error) {
//     console.error("❌ Error:");
//     console.error(error.message);
//   }
// }

// generateSomaliSpeech(`
// Asc. Magacaygu waa Anis.
// Maanta waxaan baran doonaa sida Artificial Intelligence
// loogu isticmaalo dhismaha software-ka.
// `);
