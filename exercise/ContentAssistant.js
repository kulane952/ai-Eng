// Waxaan soo import-gareyneynaa readline,
// si aan terminal-ka uga qaadno xogta user-ka.
import readline from "readline";

// Waxaan soo import-gareyneynaa OpenAI SDK,
// si aan ula xiriirno OpenRouter API.
import OpenAI from "openai";

// Waxaan soo import-gareyneynaa dotenv,
// si aan .env file-ka uga akhrino API key-ga.
import dotenv from "dotenv";

// Waxaan load-gareyneynaa variables-ka ku jira .env.
dotenv.config();


// Waxaan sameyneynaa OpenAI client,
// laakiin waxaan u sheegaynaa inuu isticmaalo OpenRouter.
const openai = new OpenAI({
  // API key-ga waxaan ka qaadaneynaa .env.
  apiKey: process.env.OPENROUTER_API_KEY,

  // Waxaan OpenAI SDK u sheegaynaa in request-yada
  // loo diro OpenRouter halkii OpenAI si toos ah.
  baseURL: "https://openrouter.ai/api/v1"
});


// Waxaan sameyneynaa readline interface,
// si program-ku user-ka uga aqbalo input terminal-ka.
const rl = readline.createInterface({
  // Input-ka wuxuu ka imaanayaa keyboard-ka.
  input: process.stdin,

  // Output-ku wuxuu ka muuqanayaa terminal-ka.
  output: process.stdout
});


// Waxaan user-ka weydiinaynaa topic uu rabo.
rl.question("Enter a topic: ", async (topic) => {

  // Waxaan soo bandhigeynaa topic-ga user-ku geliyay.
  console.log("\nYour topic:", topic);


  // Waxaan OpenRouter u diraynaa request
  // si uu u sameeyo blog post outline.
  const stream = await openai.chat.completions.create({

    // Model-ka AI-ga aan isticmaaleyno.
    model: "openai/gpt-5-mini",

    // Messages-ka waxaan ku qeexeynaa waxa AI-ga laga rabo.
    messages: [
      {
        // User ayaa request-ka diraya.
        role: "user",

        // Waxaan AI-ga u sheegnay inuu sameeyo blog outline
        // oo ku saabsan topic-ga user-ka.
        content: `Create a blog post outline about ${topic}.
Include a title, introduction, 4 main sections, and conclusion.`
      }
    ],

    // true waxay ka dhigeysaa response-ka streaming,
    // sidaas darteed text-ku qayb-qayb ayuu u soo baxayaa.
    stream: true,

    // Waxaan u sheegaynaa model-ka inuu isticmaalo
    // reasoning heer hoose ah.
    reasoning: {
      effort: "low"
    }
  });


  // Variable-kan waxaan ku kaydin doonaa
  // dhammaan outline-ka marka uu soo dhammaystirmo.
  let outline = "";


  // Waxaan terminal-ka ku muujineynaa heading.
  console.log("\nBlog Outline:\n");


  // Waxaan si tartiib-tartiib ah u akhrineynaa
  // chunks-ka AI-ga kasoo baxaya.
  for await (const chunk of stream) {

    // Waxaan chunk kasta ka soo qaadaneynaa
    // qaybta text-ka AI-ga.
    const content = chunk.choices?.[0]?.delta?.content || "";


    // Haddii chunk-ku leeyahay content,
    // waxaan sameyneynaa labada arrimood ee hoose.
    if (content) {

      // Waxaan content-ka isla markiiba ku soo bandhigeynaa terminal-ka.
      process.stdout.write(content);

      // Waxaan content-ka ku daraynaa outline-ka oo dhan.
      outline += content;
    }
  }


  // 4 — Waxaan hadda sameyneynaa summary.
  // AI-ga waxaan ka codsaneynaa inuu outline-ka
  // ku soo koobo 2 sentences.
  const summaryResponse = await openai.chat.completions.create({

    // Waxaan isticmaaleynaa isla model-kii.
    model: "openai/gpt-5-mini",

    // Waxaan AI-ga siinaynaa outline-ka
    // oo waxaan ka codsaneynaa 2 sentences.
    messages: [
      {
        // Request-kan sidoo kale user ayaa diraya.
        role: "user",

        // Waxaan sheegnay in summary-gu
        // noqdo exactly 2 sentences.
        content: `Summarize this blog outline in exactly 2 sentences:

${outline}`
      }
    ],

    // Waxaan u ogolaaneynaa reasoning heer hoose.
    reasoning: {
      effort: "low"
    }
  });


  // Waxaan response-ka AI-ga ka soo qaadaneynaa
  // message.content.
  //
  // Haddii content-ku jirin, waxaan isticmaaleynaa string madhan.
  const summary =
    summaryResponse.choices?.[0]?.message?.content || "";


  // Waxaan terminal-ka ku muujineynaa heading-ka Summary.
  console.log("\n\nSummary:");

  // Waxaan soo bandhigeynaa summary-ga.
  console.log(summary);


  // 5 — Waxaan user-ka weydiinaynaa
  // follow-up question ku saabsan topic-ga.
  rl.question(
    "\nAsk a follow-up question about the topic: ",

    // Marka user-ku su'aasha geliyo,
    // function-kan ayaa shaqeynaya.
    async (question) => {


      // Waxaan AI-ga u diraynaa follow-up question-ka.
      const answerResponse = await openai.chat.completions.create({

        // Model-ka aan isticmaaleyno.
        model: "openai/gpt-5-mini",

        // Waxaan AI-ga siinaynaa topic-ga iyo question-ka.
        messages: [
          {
            // Request-ka user-ka ayuu ka yimid.
            role: "user",

            // Waxaan AI-ga u sheegnay topic-ga,
            // su'aasha, iyo inuu si cad uga jawaabo.
            content: `Topic: ${topic}

Question: ${question}

Answer the question clearly.`
          }
        ],

        // Waxaan isticmaaleynaa reasoning heer hoose.
        reasoning: {
          effort: "low"
        }
      });


      // Waxaan response-ka AI-ga ka soo qaadaneynaa
      // message.content.
      //
      // Haddii response-ku uusan content lahayn,
      // waxaan isticmaaleynaa string madhan.
      const answer =
        answerResponse.choices?.[0]?.message?.content || "";


      // Waxaan terminal-ka ku muujineynaa heading-ka Answer.
      console.log("\nAnswer:");

      // Waxaan soo bandhigeynaa jawaabta AI-ga.
      console.log(answer);


      // Waxaan xiraynaa readline,
      // sababtoo ah program-ku shaqadiisii wuu dhammeeyay.
      rl.close();
    }
  );
});