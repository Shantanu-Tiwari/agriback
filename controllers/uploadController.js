// import { supabase } from "../supabaseClient.js";
// import { v4 as uuidv4 } from "uuid";
// import Report from "../models/Report.js";
// import { Client, handle_file } from "@gradio/client";

// const uploadController = async (req, res) => {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     try {
//         const userId = req.user.id;
//         if (!userId) return res.status(401).json({ error: "Unauthorized" });

//         const fileName = `${uuidv4()}-${req.file.originalname.replace(/\s/g, "_")}`;

//         // Upload image to Supabase
//         const { data, error } = await supabase.storage.from("uploads").upload(fileName, req.file.buffer, {
//             contentType: req.file.mimetype,
//         });

//         if (error) throw new Error("File upload failed");

//         const publicURL = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

//         // Fetch image from Supabase and convert to File object for Gradio
//         const response = await fetch(publicURL);
//         const blob = await response.blob();
//         const file = new File([blob], fileName, { type: req.file.mimetype });

//         // Connect to Gradio API
//         const client = await Client.connect("Sid26Roy/Farmer_prediction");
//         const prediction = await client.predict("/predict", [handle_file(file)]);

//         console.log("Gradio Response:", prediction);

//         // Ensure prediction contains valid data
//         let diseaseName = "Unknown Disease";
//         let confidence = "N/A";

//         if (prediction && prediction.data && Array.isArray(prediction.data) && prediction.data.length > 0) {
//             const resultLines = prediction.data[0].split("\n");
//             if (resultLines.length >= 2) {
//                 diseaseName = resultLines[0].replace("Predicted: ", "").trim();
//                 confidence = resultLines[1].replace("Confidence: ", "").trim();
//             }
//         }

//         const analysisResult = `${diseaseName} (${confidence})`;

//         // Save report
//         const newReport = new Report({
//             userId,
//             imageUrl: publicURL,
//             status: "Processed",
//             name: req.body.name || "Disease Report",
//             analysisResult,
//         });

//         await newReport.save();

//         return res.json({
//             url: publicURL,
//             prediction: analysisResult,
//             message: "Upload successful, report created",
//         });

//     } catch (err) {
//         console.error("Controller Error:", err);
//         return res.status(500).json({ error: err.message });
//     }
// };

// export default uploadController;

import { supabase } from "../supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import Report from "../models/Report.js";
import { Client, handle_file } from "@gradio/client";

const uploadController = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const fileName = `${uuidv4()}-${req.file.originalname.replace(/\s/g, "_")}`;

        // Upload image to Supabase
        const { data, error } = await supabase.storage.from("uploads").upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
        });

        if (error) throw new Error("File upload failed");

        const publicURL = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

        // Fetch image from Supabase and convert to File object for Gradio
        const response = await fetch(publicURL);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: req.file.mimetype });

        // 🧠 Decide which Gradio model to use
        const modelType = req.body.modelType || "farmer"; // default to first model
        const repoId = modelType === "cow" ? "Sid26Roy/cow_disease" : "Sid26Roy/Farmer_prediction";

        // Connect to appropriate Gradio API
        const client = await Client.connect(repoId);
        const prediction = await client.predict("/predict", [handle_file(file)]);

        console.log("Gradio Response:", prediction);

        // Extract results
        let diseaseName = "Unknown Disease";
        let confidence = "N/A";

        if (prediction && prediction.data && Array.isArray(prediction.data) && prediction.data.length > 0) {
            const resultLines = prediction.data[0].split("\n");
            if (resultLines.length >= 2) {
                diseaseName = resultLines[0].replace("Predicted: ", "").trim();
                confidence = resultLines[1].replace("Confidence: ", "").trim();
            }
        }

        const analysisResult = `${diseaseName} (${confidence})`;

        // Save report
        const newReport = new Report({
            userId,
            imageUrl: publicURL,
            status: "Processed",
            name: req.body.name || "Disease Report",
            analysisResult,
        });

        await newReport.save();

        return res.json({
            url: publicURL,
            prediction: analysisResult,
            message: `Upload successful, analyzed using ${repoId.split("/")[1]}`,
        });

    } catch (err) {
        console.error("Controller Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

export default uploadController;
