import mongoose from "mongoose";

const ExpertRequestSchema = new mongoose.Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Assuming "User" is your farmers' model
            required: true,
        },
        expertId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert", // Assuming "Expert" is your experts' model
            required: false, // If an expert hasn't been assigned yet
        },
        issueDescription: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "resolved"],
            default: "pending",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const ExpertRequest = mongoose.model("ExpertRequest", ExpertRequestSchema);
export default ExpertRequest;
