import { supabase } from "../supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import Report from "../models/Report.js";
import { Client, handle_file } from "@gradio/client"; // ✅ Using local package

const uploadController = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { name } = req.body; // ✅ Get name from request
        if (!name || name.trim() === "") return res.status(400).json({ error: "Image name is required." });

        // Generate unique filename
        const fileName = `${uuidv4()}-${req.file.originalname.replace(/\s/g, "_")}`;

        // Upload image to Supabase
        const { data, error } = await supabase.storage.from("uploads").upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
        });

        if (error) {
            console.error("Upload Error:", error);
            throw new Error("File upload failed");
        }

        // Get public URL of the uploaded image
        const publicURL = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

        // Fetch image from Supabase and convert it to a File object for Gradio
        const response = await fetch(publicURL);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: req.file.mimetype });

        // Connect to Gradio API
        const client = await Client.connect("Sid26Roy/Farmer_prediction"); // Replace with actual Gradio Space ID
        const prediction = await client.predict("/predict", [handle_file(file)]);

        // Log prediction response to check structure
        console.log("Prediction response:", prediction);

        // Extract only the disease name and confidence
        let diseaseName = "Unknown";
        let confidence = "N/A";

        if (prediction.data && Array.isArray(prediction.data) && prediction.data.length > 0) {
            const match = prediction.data[0].match(/Predicted:\s*([\w\s]+)\nConfidence:\s*([\d.]+)%/);
            if (match) {
                diseaseName = match[1].trim();
                confidence = `${match[2]}%`;
            }
        }

        // Save report with extracted information
        const newReport = new Report({
            userId,
            name: name, // ✅ Store the image name properly
            imageUrl: publicURL,
            status: "Processed",
            prediction: { disease: diseaseName, confidence },
        });

        await newReport.save();

        return res.json({
            url: publicURL,
            prediction: { disease: diseaseName, confidence },
            message: "Upload successful, report created",
        });

    } catch (err) {
        console.error("Controller Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

export default uploadController;
