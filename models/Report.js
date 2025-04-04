import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
    {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            imageUrl: { type: String, required: true },
            name: { type: String, required: false }, // Made optional to prevent errors
            status: { type: String, enum: ["Pending", "Processed"], default: "Pending" },
            analysisResult: { type: mongoose.Schema.Types.Mixed }, // Supports object or string
    },
    { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);
export default Report;
