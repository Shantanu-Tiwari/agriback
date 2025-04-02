import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import Report from "../models/Report.js";
import {getUserReports} from "../controllers/reportController.js";

const router = express.Router();

router.get("/", protect, getUserReports);
export default router;