// lib/Gemini.ts
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not defined in the .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

function getGeminiModel(modelName: string = "gemini-1.5-pro-latest"): GenerativeModel {
    return genAI.getGenerativeModel({ model: modelName });
}

/**
 * Generates content based on the provided prompt using the Gemini API.
 *
 * @param {string} prompt - The text prompt to send to the model.
 * @returns {Promise<string | null>} - The generated text content, or null if there was an error.
 */
async function generateContent(prompt: string, model: GenerativeModel): Promise<string | null> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;  // Access the response property
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
}


/**
 *  Counts the number of tokens in a given prompt
 * @param prompt The prompt to count the tokens of
 * @returns The count of tokens in the prompt
 */
async function countTokens(prompt:string, model: GenerativeModel): Promise<number | null>{
  try {
    const count = await model.countTokens(prompt);
    return count.totalTokens
  } catch (error) {
    console.error("Error counting tokens:", error);
    return null;
  }
}


export { getGeminiModel, generateContent, countTokens };