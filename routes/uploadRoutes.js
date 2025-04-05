import express from "express";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import uploadController from "../controllers/uploadController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post('/', protect ,  uploadMiddleware, uploadController);
router.post("/upload/farmer", authMiddleware, upload.single("file"), uploadFarmer);
router.post("/upload/cow", authMiddleware, upload.single("file"), uploadCow);

export default router;