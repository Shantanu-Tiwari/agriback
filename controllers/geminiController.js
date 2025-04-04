import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getDiseaseInfo = async (req, res) => {
    console.log("Received request body:", req.body); // Debugging

    const { query } = req.body;  // Ensure frontend sends `query`

    if (!query) {
        return res.status(400).json({ error: "Query is required." });
    }

    try {
        const response = await model.generateContent(query);

        // Extract the AI response correctly
        const aiResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

        res.json({ result: aiResponse });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to fetch AI response." });
    }
};
