import Report from "../models/Report.js";

export const getUserReports = async (req, res) => {
    try {
        // Log the user ID to ensure that we are passing the correct ID
        console.log('Fetching reports for user ID:', req.user._id);

        // Fetch reports for the logged-in user
        const reports = await Report.find({ userId: req.user._id }).sort({ createdAt: -1 });

        // Log reports to check if they're being retrieved correctly
        console.log('Fetched reports:', reports);

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found for this user.' });
        }

        // Send back the fetched reports
        res.status(200).json(reports);
    } catch (error) {
        console.error("Fetching Reports error: ", error);
        res.status(500).json({ error: "Failed to fetch reports" });
    }
};
