import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getDiseaseInfo = async (req, res) => {
    const { disease } = req.body;

    if (!disease) {
        return res.status(400).json({ error: "Disease name is required." });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Explain the disease ${disease}. Provide its cure and prevention.`,
        });

        res.json({ result: response.text || "No response from AI." });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to fetch AI response." });
    }
};
