
// Waxaan soo import-gareyneynaa OpenAI SDK,
// si aan ula xiriirno OpenRouter API.
import OpenAI from "openai";

// Waxaan soo import-gareyneynaa dotenv,
// si aan .env file-ka uga akhrino API key-ga.
import dotenv from "dotenv";

// Waxaan soo import-gareyneynaa fs,
// si aan images-ka file ahaan ugu kaydino.
import fs from "fs/promises";

// Waxaan load-gareyneynaa variables-ka ku jira .env.
dotenv.config();

// Waxaan sameyneynaa OpenAI client,
// laakiin waxaan u sheegaynaa inuu isticmaalo OpenRouter.
const openai = new OpenAI({
  // API key-ga waxaan ka qaadaneynaa .env.
  apiKey: process.env.OPENROUTER_API_KEY,

  // Waxaan OpenAI SDK u sheegaynaa in request-yada
  // loo diro OpenRouter halkii OpenAI si toos ah.
  baseURL: "https://openrouter.ai/api/v1",
});