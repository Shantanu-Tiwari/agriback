import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper to clean and format the response
const formatAIResponse = (rawText) => {
    if (!rawText) return "";

    // 1. Remove markdown bold symbols (**text**)
    let cleaned = rawText.replace(/\*\*(.*?)\*\*/g, "$1");

    // 2. Normalize new lines (optional formatting)
    cleaned = cleaned
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            // Add bullets for points starting with dashes or numbers
            if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
                return `• ${line.replace(/^[-*]\s/, "").replace(/^\d+\.\s/, "")}`;
            }
            return line;
        })
        .join("\n");

    return cleaned;
};

export const getDiseaseInfo = async (req, res) => {
    console.log("Received request body:", req.body);

    const { query, language } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query is required." });
    }

    try {
        const prompt = `Respond in ${language || "English"}.\n${query}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        const aiResponse = response.text;

        if (!aiResponse) throw new Error("No valid response from AI.");

        // Format and clean AI response before sending it back
        const formatted = formatAIResponse(aiResponse);

        res.json({ result: formatted });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to fetch AI response." });
    }
};
