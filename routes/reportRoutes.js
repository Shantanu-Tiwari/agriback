import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserReports, createReport } from "../controllers/reportController.js";

const router = express.Router();

// ✅ Route to get user reports
router.get("/", protect, getUserReports);

// ✅ Route to create a new report
router.post("/", protect, createReport);

export default router;
