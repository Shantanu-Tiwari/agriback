import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/gemini", geminiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
