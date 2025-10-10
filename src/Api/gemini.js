// Api/gemini.js
import { GoogleGenAI } from "@google/genai";

// Put your own API key here
const GEMINI_API_KEY = "AIzaSyBsbzPKuXYABHo_5ywGl-NjXXvZtkMyzcA";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Main function to send prompt to Gemini AI and get text response
export default async function main(prompt) {
  // If prompt is empty
  // if (!prompt || !prompt.trim()) return "Prompt is empty!";

  try {
    // Send prompt to the AI model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    // Extract only the text from response
    const result = response.text;
    console.log(result);

    return result; // Return the final text
  } catch (error) {
    console.error("❌ Error:", error);
    return "Error: " + (error.message || "Unknown error");
  }
}
