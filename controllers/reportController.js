import Report from "../models/Report.js";

// ✅ Create a New Report
export const createReport = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        const { imageUrl, prediction } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: "Image URL is required." });
        }

        const newReport = new Report({
            userId: req.user._id,
            name: req.body.name || "Untitled Report", // Default name if not provided
            imageUrl,
            status: "Processed",
            prediction: prediction || "Pending", // Default if prediction is missing
        });

        await newReport.save();
        res.status(201).json({ message: "Report created successfully", report: newReport });

    } catch (error) {
        console.error("Report creation error: ", error);
        res.status(500).json({ error: "Failed to create report. Please try again later." });
    }
};
