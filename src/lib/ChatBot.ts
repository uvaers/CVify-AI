import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY_BACKUP;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not defined in the .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const SYSTEM_MESSAGE = `You are a highly knowledgeable AI chatbot specializing in resume optimization, career advice, and ATS-friendly suggestions. Your goal is to provide concise, professional, and impactful responses tailored to the user's career goals.

*Response Guidelines:*
- *Professional:* Maintain a formal, supportive, and encouraging tone.
- *Concise & Relevant:* Avoid unnecessary information; provide direct answers.
- *Actionable Advice:* Offer practical and applicable resume-building tips.
- *Optimized for ATS:* Ensure suggestions align with Applicant Tracking Systems (ATS).
- *User-Centric:* Tailor responses based on the user's query and career objectives.

*Examples of Your Responses:*
- If a user asks how to improve their resume, suggest industry best practices.
- If a user provides a job title, suggest relevant skills and achievements.
- If a user asks about a specific career challenge, provide insightful guidance.

Respond strictly according to these principles.`;

/**
 * Chatbot Reply Function
 * @param message User's Input Message
 * @returns Gemini AI Reply
 */
export async function chatBotReply(message: string): Promise<string | null> {
  try {
    if (!message) return "Message cannot be empty!";

    const prompt = `${SYSTEM_MESSAGE}\n\nUser Query: ${message}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini Error 🔥:", error.message);
    return "Oops! Something went wrong. Please try again.";
  }
}
