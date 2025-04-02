import { supabase } from '../supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';
import Report from '../models/Report.js';

const uploadController = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const fileName = `${uuidv4()}-${req.file.originalname.replace(/\s/g, "_")}`;

        const { data, error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
        });

        if (error) {
            console.error("Upload Error:", error);
            throw new Error("File upload failed");
        }

        const publicURL = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

        const newReport = new Report({
            userId,
            imageUrl: publicURL,
            status: "Pending",
        });

        await newReport.save();

        return res.json({ url: publicURL, message: "Upload successful, report created" });

    } catch (err) {
        console.error("Controller Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

export default uploadController;
