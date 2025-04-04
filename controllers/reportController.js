import Report from "../models/Report.js";

export const getUserReports = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        console.log(`Fetching reports for user ID: ${req.user._id}`);

        // Fetch reports for the logged-in user, sorted by most recent first
        const reports = await Report.find({ userId: req.user._id }).sort({ createdAt: -1 });

        if (!reports.length) {
            console.log("No reports found for this user.");
        } else {
            console.log(`Fetched ${reports.length} reports.`);
        }

        res.status(200).json(reports);
    } catch (error) {
        console.error("Fetching Reports error: ", error);
        res.status(500).json({ error: "Failed to fetch reports. Please try again later." });
    }
};
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
