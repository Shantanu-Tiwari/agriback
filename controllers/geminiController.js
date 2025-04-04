import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getDiseaseInfo = async (req, res) => {
    console.log("Received request body:", req.body); // Debugging

    const { query } = req.body;  // Make sure the frontend sends `query`

    if (!query) {
        return res.status(400).json({ error: "Query is required." });
    }

    try {
        // Correct method to fetch AI response
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: query, // Ensure `query` is a string
        });

        // Correct way to extract the response text
        const aiResponse = response.text;

        if (!aiResponse) throw new Error("No valid response from AI.");

        res.json({ result: aiResponse });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to fetch AI response." });
    }
};
