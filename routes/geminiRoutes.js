import express from "express";
import { getDiseaseInfo } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/", getDiseaseInfo);

export default router;
